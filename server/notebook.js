const app = require('APP'), {env} = app
const debug = require('debug')(`${app.name}:notebooks`)

const {Notebook, Note} = require('APP/db')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Notebook.findAll({where: {user_id: req.user.id}})
    .then(notebooks => res.send(notebooks))
    .catch(next)
  })
  .get('/:notebookId', (req, res, next) => {
    Notebook.findOne({where: {id: req.params.notebookId}})
    .then(notebook => res.send(notebook))
    .catch(next)
  })
  .get('/:notebookId/notes', (req, res, next) => {
    Note.findAll({where: {notebook_id: req.params.notebookId}})
    .then(notes => res.send(notes))
    .catch(next)
  })
  .get('/notes/:noteId', (req, res, next) => {
    Note.findOne({where: {id: req.params.noteId}})
    .then(note => res.send(note))
    .catch(next)
  })
