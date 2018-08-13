import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  notebook: require('./notebook').default
})

export default rootReducer
