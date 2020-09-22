import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { setNotification } from '../store/actions/notificationActions.js'
import { onLogin, onLogout, onSignup } from '../store/actions/userActions.js'
import { QuizPreview } from '../cmps/QuizPreview.jsx';
import { Link } from 'react-router-dom';

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
        },
        isRegister: false
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
    onSignup = () => {
        if (!this.state.registerInfo.username || !this.state.registerInfo.password) return alert('Please enter username/password')
        if (!this.state.registerInfo.imgUrl) this.setState({ registerInfo: { ...this.state.registerInfo, imgUrl: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg' } }, async (ev) => {
            await this.props.onSignup(this.state.registerInfo)

        })


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
    showInputs = () => {
        this.setState({ isRegister: !this.state.isRegister })
    }
    render() {


        const { loggedInUser } = this.props
        console.log("render -> loggedInUser", loggedInUser)
        
        const { isRegister } = this.state
        return (
            <div className="login-profile-container">
                {!loggedInUser && isRegister && <div className="signup-container">
                    <h1>Signup</h1>
                    <h5 onClick={this.showInputs}>Already have an account? <span className="yellow" >Log In</span> </h5>
                    <form className="signup-form mt10" onSubmit={this.onSignup}>
                        <div className="username-input">

                            <TextField autoFocus onChange={this.handleChangeSign} autoComplete="username" name="username" id="outlined-basic" label="Username" variant="outlined" /></div>
                        <div className="password-input">
                            <TextField type="password" autoComplete="new-password" onChange={this.handleChangeSign} name="password" id="outlined-basic password" label="Password" variant="outlined" /></div>

                        <label className="upload-btn mt10" htmlFor="img-upload">

                            {!this.state.registerInfo.imgUrl && <div className="profile-uploader">
                                Click to select Profile Image
                                <img src="https://www.mini-anes-derivery.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" alt=""/>
                                </div>}
                                
                                
                                </label>

                        {this.state.registerInfo.imgUrl &&
                            <img className="register-img" src={this.state.registerInfo.imgUrl} alt="img" />}

                        <input hidden type="file" className="file-input" name="img-upload" id="img-upload"
                            onChange={this.uploadImg} />



                        <Button variant="contained" color="primary" type="submit" onClick={this.onSignup}>Submit</Button>

                    </form>
                </div>}
                {!loggedInUser && !isRegister && <div className="login-container">
                    <h1>Login</h1>
                    <h5 onClick={this.showInputs}>Don't have an account? <span className="yellow">Sign Up</span> </h5>

                    <form className="login-form mt10" onSubmit={this.onLogin}>
                        <div className="username-input">
                            <TextField autoFocus onChange={this.handleChangeLog} name="username" autoComplete="username" id="outlined-basic username" label="Username" variant="outlined" /></div>
                        <div className="password-input">
                            <TextField onChange={this.handleChangeLog} type="password" name="password" autoComplete="current-password" id="outlined-basic password" label="Password" variant="outlined" /></div>
                        <Button variant="contained" color="primary" type="submit" onClick={this.onLogin}>Submit</Button>
                    </form>

                </div>}
                {loggedInUser && <div className="profile-container">
                    <div className="profile-header">
                        <h2>Welcome, {loggedInUser.username}</h2>
                        {loggedInUser.profileImg && <img className="profile-img" src={loggedInUser.profileImg} alt="" />}
                        {/* <button onClick={this.onLogout}>Logout</button> */}
                        <div className="logout-btn mt10">
                            <Button variant="outlined" color="secondary" className="mt10" onClick={this.onLogout}>Logout</Button></div>
                    </div>
                    <div className="quiz-list-header">
                        <h2 className="quizzes-header">My Quizzes:</h2>
                        <Link to='/edit'>
                            <Button variant="outlined" color="primary">
                                Create </Button></Link></div>
                    <div className="user-quizzes-container list ">
                        {loggedInUser.quizzes.length > 0 &&
                            loggedInUser.quizzes.map(quiz => {
                                return <QuizPreview key={quiz.quizId} quizId={quiz.quizId} />
                            })}</div>


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


