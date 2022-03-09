import { connect } from 'react-redux'
import BaseView from './components/BaseView'

import {
} from 'authentication/actions'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseView)
