import React from 'react';
import { Link } from 'react-router-dom'
import ServerIndexItem from './server_index-item';
import ServerCreateContainer from '../server_CRUD/server_create_container'
import Modal from 'react-modal';
import { GiEntryDoor } from 'react-icons/gi'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class ServerIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showCreateModal: false,
      showJoinModal: false
    };
    this.toggleCreateModal = this.toggleCreateModal.bind(this);
    this.toggleJoinModal = this.toggleJoinModal.bind(this);
  }

  componentDidMount() {
    this.props.getServers();
    this.props.getUsers();
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.servers.length) !== (this.props.servers.length)) {
      this.props.getServers();
    }
  }

  toggleCreateModal() {
    const prevState = this.state.showCreateModal;
    this.setState({ showCreateModal: !prevState });
  }

  toggleJoinModal() {
    const prevState = this.state.showJoinModal;
    this.setState({ showJoinModal: !prevState });
  }
  
  render() {
    return (
      <div id="server-index">
      <ToastContainer id="toast" position="top-center" />
        <div id="server-box">
          <Link to="/channels/@me" className="home-link">
            <img id="server-button" src={window.logo_head_white} />
          </Link>
          <p id="home-text-display">Home</p>
        </div>
          <div id="server-line"></div>
        <ul>
          {
            this.props.servers.map((server) => (
              <ServerIndexItem server={server} key={server.id} />
            ))
          }
        </ul>
        <div id="server-box">
          <label id="new-server" onClick={this.toggleCreateModal}>+</label>
          <p id="add-server-text">New Hideout</p>
          <Modal
            isOpen={this.state.showCreateModal}
            contentLabel="Create Server Modal"
            onRequestClose={this.toggleCreateModal}
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: '0',
                bottom: '0',
                marginLeft: "-245px",
                marginTop: "-175px",
                overflow: "hidden",
                width: '490px',
                height: '350px',
                background: 'rgb(255, 255, 255)'
              },
              overlay: {
                position: 'fixed',
                backgroundColor: 'rgba(0,0,0,0.7)',
                zIndex: '50'
              }
            }}
          >
            <h1 id="new-server-title">Greed is good</h1>
            <ServerCreateContainer closeModal={this.toggleCreateModal} />
            <label id="new-server-close" onClick={this.toggleCreateModal}>BACK</label>
          </Modal>
        </div>
        <div id="server-box">
            <label id="join-server" onClick={this.toggleJoinModal}>
              <GiEntryDoor size={25} color="white" />
            </label>
            <p id="add-server-text">Join Hideout</p>
            <Modal
              isOpen={this.state.showJoinModal}
              contentLabel="Join Hideout Modal"
              onRequestClose={this.toggleJoinModal}
              style={{
                content: {
                  top: '50%',
                  left: '50%',
                  right: '0',
                  bottom: '0',
                  marginLeft: "-245px",
                  marginTop: "-175px",
                  width: '400px',
                  height: '210px',
                  background: 'rgb(54, 57, 63)',
                  border: '1px solid rgb(54, 57, 63)'
                },
                overlay: {
                  position: 'fixed',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  zIndex: '50'
                }
              }}
            >
              <h1 id="invite-grunts-title">Partners in Crime</h1>
              <div id="invite-code-box">
                <p id="invite-code-title">Secret Code</p>
                <div id="invite-code-container" tabIndex="1">
                  <p id="invite-code">Enter code here</p>
                </div>
              </div>
              <label id="invite-grunts-close" onClick={this.toggleJoinModal}>DONE</label>
            </Modal>
        </div>
      </div>
    )
  }
}

export default ServerIndex;