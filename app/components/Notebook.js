import React, { Component } from 'react'
import { Link } from 'react-router'

export default(props) => {
  const notebook = props.selectedNotebook
  const notes = props.selectedNotes
  return (
    <div>
      {
        notebook ? <h1>{notebook.name}</h1> : null
      }
      <ol>
        {
          notes ? notes.map(function(n) {
            return (
              <li key={n.id}><Link className="note-link" to={`/notes/${n.id}`}>
              <h4 key={n.id}>{n.name}</h4>
              </Link>
              </li>
            )
          }) : null
        }
      </ol>
    </div>
  )
}
