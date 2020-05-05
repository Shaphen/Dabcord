import { connect } from 'react-redux';
import ServerForm from './server_form';
import { updateServer } from '../../../actions/server_actions';

const mSTP = (state, ownProps) => {
  debugger
  return {
    currentUser: state.entities.users[state.session.id],
    server: state.entities.servers[ownProps.match.params.server_id],
    errors: state.errors.session,
    formType: "Picky Villans Come Ahead"
  }
};

const mDTP = dispatch => ({
  action: server => dispatch(updateServer(server))
});

export default connect(mSTP, mDTP)(ServerForm);