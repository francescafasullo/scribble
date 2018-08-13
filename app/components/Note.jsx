import React, { Component } from 'react'

export default(props) => {
  const note = props.selectedNote

  return (
    <div>
    {
      note ?
      <div>
        <h1>{note.name}</h1>
        <p>{note.text}</p>
      </div>
        : null
    }
    </div>
  )
}
