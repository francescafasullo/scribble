import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    const user = this.props.user

    return (
      <div>
        <h1>Welcome to Scribble!</h1>
        {
          user ?
          <div>
          <a href="/notebooks">View Your Notebooks</a>
          </div> : null
        }
      </div>
    )
  }
}
