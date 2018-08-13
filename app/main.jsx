'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import HomeContainer from './containers/HomeContainer'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import NotebooksContainer from './containers/NotebooksContainer'
import NotebookContainer from './containers/NotebookContainer'
import NoteContainer from './containers/NoteContainer'

import {getNotebooks, getNotebook, getNotes, getNote} from './reducers/notebook.jsx'

const onNotebooksEnter = nextRouterState => {
  store.dispatch(getNotebooks())
}

const onNotebookEnter = nextRouterState => {
  const notebookId = nextRouterState.params.notebookId
  store.dispatch(getNotebook(notebookId))
  store.dispatch(getNotes(notebookId))
}

const onNoteEnter = nextRouterState => {
  const noteId = nextRouterState.params.noteId
  store.dispatch(getNote(noteId))
}

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={HomeContainer} />
        <Route path="/notebooks" component={NotebooksContainer} onEnter={onNotebooksEnter}/>
        <Route path="/notebooks/:notebookId" component={NotebookContainer} onEnter={onNotebookEnter}/>
        <Route path="/notes/:noteId" component={NoteContainer} onEnter={onNoteEnter}/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
