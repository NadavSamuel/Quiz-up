import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';


export class _SetName extends Component {

    state = {
        fullName: ''
    }

    componentDidMount() {
    }



    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value
        this.setState({ [field]: value })
    }



    render() {
        return (
            <div className="set-name-container">
                <form onSubmit={event => this.props.getCurrUnregisteredUser(event, this.state.fullName)}>
                    <TextField className='set-name' label="What's your name?" variant="outlined" autoComplete="off"
                        type="text" name='fullName' onChange={this.handleChange} value={this.state.fullName} />
                    <h3>Already have a user?<Link to={`/user/${this.props.quizId}`}><span className="yellow">Sign In!</span> </Link></h3>

                    <button>Quiz-Up!</button>

                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedinUser: state.userReducer.loggedinUser
    }
}
const mapDispatchToProps = {
}
export const SetName = connect(mapStateToProps, mapDispatchToProps)(_SetName)