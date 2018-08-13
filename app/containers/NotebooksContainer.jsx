import React from 'react'
import {connect} from 'react-redux'

import Notebooks from '../components/Notebooks'

const mapStateToProps = state => ({
  allNotebooks: state.notebook.allNotebooks
})

export default connect(mapStateToProps)(Notebooks)
