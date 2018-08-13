import React from 'react'
import {connect} from 'react-redux'

import Notebook from '../components/Notebook'

const mapStateToProps = state => ({
  selectedNotebook: state.notebook.selectedNotebook,
  selectedNotes: state.notebook.selectedNotes
})

export default connect(mapStateToProps)(Notebook)
