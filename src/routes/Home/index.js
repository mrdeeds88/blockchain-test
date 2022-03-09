import { connect } from 'react-redux'
import HomeView from './components/HomeView'

import {
} from 'authentication/actions'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  //currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
