import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { onLogin } from '../store/actions/userActions.js'
import { setNotification } from '../store/actions/notificationActions.js'
import { QuizPreview } from '../cmps/QuizPreview.jsx';
import { Link } from 'react-router-dom';
// import { QuizPreview } from '../cmps/QuizPreviewOrigin.jsx';
export class _LoginSignup extends Component {
    state = {
        loginInfo: {
            username: '',
            password: ''
        },
        registerInfo: {
            username: '',
            password: ''
        }
    }
    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ loginInfo: { ...this.state.loginInfo, [name]: value } })

    }
    onLogin = async ev => {
        if (!this.state.loginInfo.username || !this.state.loginInfo.password) return alert('Please enter username/password')
        await this.props.onLogin(this.state.loginInfo)
        console.log('user:', this.props.loggedInUser);
    }

    render() {
        const { loggedInUser } = this.props
        return (
            <div className="login-profile-container">
                {!loggedInUser && <div className="login-container">
                    {!loggedInUser && <h1>Login page</h1>}
                    {!loggedInUser &&
                        <form className="login-form" onSubmit={this.onLogin}>
                            <TextField autoFocus onChange={this.handleChange} name="username" id="outlined-basic" label="Username" variant="outlined" />
                            <TextField onChange={this.handleChange} name="password" id="outlined-basic" label="Password" variant="outlined" />
                            <Button variant="contained" color="primary" onClick={this.onLogin}>Submit</Button>
                        </form>}

                </div>}
                {loggedInUser && <div className="profile-container">
                    <div className="profile-header">
                        <h2>Welcome, {loggedInUser.username}</h2>
                        {loggedInUser.profileImg && <img src={loggedInUser.profileImg} alt="" />}
                    </div>

                    <h2>My Quizzes:</h2>
                    <div className="user-quizzes-container list ">
                        {loggedInUser.quizzes.length &&
                            loggedInUser.quizzes.map(quiz => {
                                return <QuizPreview key={quiz.quizId} quizId={quiz.quizId} />
                            })}</div>

                    <Link to='/edit'>
                        <Button variant="outlined" color="primary">
                            Create More</Button></Link>
                </div>}
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
    onLogin,
    setNotification
}
export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)
