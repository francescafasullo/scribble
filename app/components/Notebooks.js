import React, { Component } from 'react'
import { Link } from 'react-router'

export default(props) => {
    const notebooks = props.allNotebooks
    return (
      <div>
        <h1>Your Notebooks</h1>
        <ul>
          {
            notebooks ? notebooks.map(function(n) {
              return (
                <li key={n.id}><Link className="notebook-link" to={`/notebooks/${n.id}`}>
                <h4 className="overview" key={n.id}>{n.name}</h4>
                </Link>
                </li>
              )
            }) : null
          }
        </ul>
        <button>+</button>
      </div>
    )
  }
