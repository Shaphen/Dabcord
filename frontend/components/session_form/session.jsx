import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import DemoLoginContainer from '../greeting/demo_login';

class Session extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      username: "",
      password: "",
      email: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.demoLogin = this.demoLogin.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processEntry(user).then(() => this.props.history.push("/channels/@me"))
  }

  demoLogin(e) {
    e.preventDefault();
    const user = {
      username: "masterchef",
      password: "password"
    }
    this.props.processEntry(user).then(() => this.props.history.push("/channels/@me"))
  }

  renderErrors() {
    if (this.props.errors){
      return (
        <ul>
          {this.props.errors.map((error, i) => (
            <li className="errors" key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }
  
  handleChange(type) {
    return e => {
      this.setState({[type]: e.target.value})
    }
  }

  render() {
    const address = this.props.formType === 'Welcome Back!' ? '/signup' : '/login'
    const name = this.props.formType === 'Welcome Back!' ? 'Register' : 'Already have an account?'
    return (
      <div className="login-signup-background">
        <img className="login-signup-bg-img" src={window.login_signup_bg}/>
          <img className="login-signup-bg-logo" src={window.mono_logo} />
        <div id="session">
          <Link to="/" className="login-signup-go-back">X</Link>
          <div id="form-box">
            <h1 className="form-type">{ this.props.formType }</h1>
            <form className="login-signup-form" onSubmit={ this.handleSubmit }>
              <label className="username">
                <p>USERNAME</p>
                <input type="text" value={this.state.username} onChange={this.handleChange('username')} />
              </label>
              {
                this.props.formType === 'Create an account' ? <label className="email">EMAIL</label>: ''
              }
              {
                this.props.formType === 'Create an account' ? <input type="email" className="email-box" value={this.state.email} onChange={this.handleChange('email')}/> : ''
              }
              <label className="password">
                <p>PASSWORD</p>
                <input type="password" value={this.state.password} onChange={this.handleChange('password')} />
              </label>
              <button className="session-submit-button" value={this.props.formType}>Submit</button>
              <button onClick={(e) => this.demoLogin(e)} className="demo-login">Demo Login</button>
              <Link to={address} className="other-form">{name}</Link>
            </form>
          </div>
          <div id="errors-box">
            {this.renderErrors()}
          </div>
        </div>
      </div>
    )
  }
}

export default Session;