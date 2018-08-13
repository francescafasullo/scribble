'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('notebooks', {
  name: STRING,
})

module.exports.associations = (Notebook, {User, Note}) => {
  Notebook.belongsTo(User)
  Notebook.hasMany(Note)
}
