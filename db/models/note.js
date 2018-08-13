'use strict'

const {STRING, TEXT} = require('sequelize')

module.exports = db => db.define('notes', {
  name: STRING,
  text: TEXT
})

module.exports.associations = (Note, {Notebook}) => {
  Note.belongsTo(Notebook)
}
