import axios from 'axios'

const initialState = {
  allNotebooks: [],
  selectedNotebook: {},
  selectedNotes: [],
  selectedNote: {}
}

/* ---- actions ---- */
const GET_ALL_NOTEBOOKS = 'GET_ALL_NOTEBOOKS'
const GET_NOTEBOOK = 'GET_NOTEBOOK'
const GET_NOTES = 'GET_NOTES'
const GET_NOTE = 'GET_NOTE'

/* ---- action creators ---- */
const getAllNotebooks = (allNotebooks) => ({
  type: GET_ALL_NOTEBOOKS, allNotebooks
})

const getOneNotebook = (selectedNotebook) => ({
  type: GET_NOTEBOOK, selectedNotebook
})

const getNotesForNotebook = (selectedNotes) => ({
  type: GET_NOTES, selectedNotes
})

const getOneNote = (selectedNote) => ({
  type: GET_NOTE, selectedNote
})

/* ---- dispatchers ---- */
export const getNotebooks = () =>
  dispatch => {
    axios.get("/api/notebooks/")
    .then(res => res.data)
    .then(notebooks => {
      return dispatch(getAllNotebooks(notebooks))
    })
    .catch(err => console.error(err))
}

export const getNotebook = (notebookId) =>
  dispatch => {
    axios.get(`/api/notebooks/${notebookId}`)
    .then(res => res.data)
    .then(notebook => {
      return dispatch(getOneNotebook(notebook))
    })
    .catch(err => console.error(err))
  }

export const getNotes = (notebookId) =>
  dispatch => {
    axios.get(`/api/notebooks/${notebookId}/notes`)
    .then(res => res.data)
    .then(notes => {
      return dispatch(getNotesForNotebook(notes))
    })
    .catch(err => console.error(err))
  }

export const getNote = (noteId) =>
  dispatch => {
    axios.get(`/api/notebooks/notes/${noteId}`)
    .then(res => res.data)
    .then(note => {
      return dispatch(getOneNote(note))
    })
    .catch(err => console.error(err))
  }

  /* ---- reducer ---- */
  const reducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
    case GET_ALL_NOTEBOOKS:
      newState.allNotebooks = action.allNotebooks
      break

    case GET_NOTEBOOK:
      newState.selectedNotebook = action.selectedNotebook
      break

    case GET_NOTES:
      newState.selectedNotes = action.selectedNotes
      break

    case GET_NOTE:
      newState.selectedNote = action.selectedNote
      break

    default:
      return state
    }
    return newState
  }

  export default reducer
