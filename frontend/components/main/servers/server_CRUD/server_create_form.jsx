import React from 'react';

class ServerCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ownerId: this.props.currentUser.id,
      photo: null,
      photoPreview: null,
      inviteCode: Math.random().toString(18).toUpperCase().slice(5),
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  componentDidMount() {
    this.setState({ name: `${this.props.currentUser.username}'s server` })
    this.setState({ owner_id: this.props.currentUser.id })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('server[name]', this.state.name);
    formData.append('server[owner_id]', this.state.ownerId);
    if (this.state.photo) {
      formData.append('server[photo]', this.state.photo);
    }
    formData.append('server[invite_code]', this.state.inviteCode)
    this.props.createServer(formData)
      .then((res) => res ? this.props.history.push(`/channels/${res.server.server.id}/${res.server.server.channel_ids[0]}`) : this.props.history.push(`/channels/@me`))
      .then(() => this.props.closeModal(e))
  }

  handleChange(type){
    return e => {
      this.setState({ [type]: e.target.value })
    }
  }

  handleLoading() {
    this.setState({ loading: true })
  }

  handleFile(e) {
    const file = e.currentTarget.files[0]
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photo: file, photoPreview: fileReader.result })
    }
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleImageClick() {
    $("#choose-server-photo-button").trigger("click")
  }

  render() {
    const preview = this.state.photoPreview ? <img id="img-preview" src={ this.state.photoPreview }/> : null
    
    return (
      <div id="server-form-container">
        <div id="new-server-description">
          <p>By creating a server, you will have access to free text chats to make all of your mischievous plans</p>
        </div>
        <form onSubmit={ this.handleSubmit }>
          <div id="server-name-container2">
              <label id="server-name-title2">SERVER NAME</label>
              <input id="server-name-input2" type="text" onChange={this.handleChange('name')} value={this.state.name}/>
              <div id="create-server-button-container">
              </div>
          </div>
          <div id="upload-server-photo" onClick={this.handleImageClick}>
            { preview }
            <p id="change-icon-server">CHANGE ICON</p>
            <input type="file" accept="image/*" id="choose-server-photo-button" onChange={this.handleFile} />
          </div>
          <button disabled={this.state.loading} id="create-server-button" value={this.props.formType}>
            {this.state.loading ? "loading..." : "Create" }
          </button>
        </form>
      </div>
    )
  }
}

export default ServerCreateForm;