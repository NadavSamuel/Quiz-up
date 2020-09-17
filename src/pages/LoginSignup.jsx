import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { onLoginSync } from '../store/actions/userActions.js'

export class _LoginSignup extends Component {
    state = {
        username: '',
        password: ''
    }
    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value })

    }
    onLogin = async ev => {
        if (!this.state.username || !this.state.password) return alert('Please enter username/password')
        this.props.onLoginSync(this.state)
    }

    render() {
        const { loggedInUser } = this.props
        console.log('logged in:',loggedInUser);
        return (
            <div>
                <h1>Login page</h1>
                {!loggedInUser && <form className="login-form" onSubmit={this.onLogin}>
                    <TextField autoFocus  onChange={this.handleChange} name="username" id="outlined-basic" label="Username" variant="outlined" />
                    <TextField  onChange={this.handleChange} name="password" id="outlined-basic" label="Password" variant="outlined" />
                    <Button variant="contained" color="primary" onClick={this.onLogin}>Submit</Button>
                </form>}
                {loggedInUser && <h2>Welcome,{loggedInUser.username}</h2>}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedinUser
    }
}
const mapDispatchToProps = {
    onLoginSync
}
export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)
