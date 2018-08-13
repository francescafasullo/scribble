import React from 'react'
import {connect} from 'react-redux'

import Note from '../components/Note'

const mapStateToProps = state => ({
  selectedNote: state.notebook.selectedNote
})

export default connect(mapStateToProps)(Note)
