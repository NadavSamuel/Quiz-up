import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { setNotification } from '../store/actions/notificationActions.js'
import { onLogin, onLogout, onSignup } from '../store/actions/userActions.js'
import { QuizPreview } from '../cmps/QuizPreview.jsx';
import { Link } from 'react-router-dom';
import { UploadBtn } from '../cmps/UploadBtn.jsx';

export class _LoginSignup extends Component {
    state = {
        loginInfo: {
            username: '',
            password: ''
        },
        registerInfo: {
            username: '',
            password: '',
            imgUrl: ''
        }
    }
    handleChangeLog = ({ target }) => {
        const { name, value } = target
        this.setState({ loginInfo: { ...this.state.loginInfo, [name]: value } })

    }

    handleChangeSign = ({ target }) => {
        const { name, value } = target
        this.setState({ registerInfo: { ...this.state.registerInfo, [name]: value } }, () => console.log(this.state.registerInfo))
    }
    onLogin = async ev => {
        if (!this.state.loginInfo.username || !this.state.loginInfo.password) return alert('Please enter username/password')
        await this.props.onLogin(this.state.loginInfo)
        console.log('user:', this.props.loggedInUser);
    }
    onSignup = async ev => {
        if (!this.state.registerInfo.username || !this.state.registerInfo.password) return alert('Please enter username/password')
        await this.props.onSignup(this.state.registerInfo)

    }
    onLogout = async ev => {
        await this.props.onLogout()
        this.props.history.push('/')
    }
    uploadImg = async (ev) => {
        const CLOUD_NAME = "dsrtl41yz"
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

        const formData = new FormData();
        formData.append('file', ev.target.files[0])
        formData.append('upload_preset', 'ml_default');
        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            // console.log(data);
            this.setState({ registerInfo: { ...this.state.registerInfo, imgUrl: data.secure_url } }, () => console.log(this.state.registerInfo))
            return data

        } catch (err) {
            console.log('Got Error uploading the img:', err);
        }

    }

    render() {


        const { loggedInUser } = this.props
        return (
            <div className="login-profile-container">
                {!loggedInUser && <div className="signup-container">
                    <h1>Signup</h1>
                    <form className="signup-form" onSubmit={this.onSignup}>
                        <TextField onChange={this.handleChangeSign} name="username" id="outlined-basic" label="Username" variant="outlined" />
                        <TextField onChange={this.handleChangeSign} name="password" id="outlined-basic" label="Password" variant="outlined" />
                        {/* <label htmlFor="upload-btn"> */}
                            <UploadBtn uploadImg={this.uploadImg}/>
                        <Button variant="contained" color="primary" onClick={this.onSignup}>Submit</Button>
                        {/* </label> */}
                        {/* <input onChange={this.uploadImg} id="upload-btn" type="file" /> */}
                    </form>
                </div>}
                {!loggedInUser && <div className="login-container">
                    <h1>Login</h1>

                    <form className="login-form" onSubmit={this.onLogin}>
                        <TextField autoFocus onChange={this.handleChangeLog} name="username" id="outlined-basic" label="Username" variant="outlined" />
                        <TextField onChange={this.handleChangeLog} name="password" id="outlined-basic" label="Password" variant="outlined" />
                        <Button variant="contained" color="primary" onClick={this.onLogin}>Submit</Button>
                    </form>

                </div>}
                {loggedInUser && <div className="profile-container">
                    <div className="profile-header">
                        <h2>Welcome, {loggedInUser.username}</h2>
                        {loggedInUser.profileImg && <img src={loggedInUser.profileImg} alt="" />}
                        {/* <button onClick={this.onLogout}>Logout</button> */}
                        <div className="logout-btn mt10">
                            <Button variant="outlined" color="secondary" className="mt10" onClick={this.onLogout}>Logout</Button></div>
                    </div>

                    <h2 className="quizzes-header">My Quizzes:</h2>
                    <div className="user-quizzes-container list ">
                        {loggedInUser.quizzes.length > 0 &&
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
    setNotification,
    onLogout,
    onSignup
}
export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)


