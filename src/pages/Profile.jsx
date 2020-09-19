import React, { Component } from 'react'
import { connect } from 'react-redux'
export class _Profile extends Component {
    render() {
        const { loggedInUser } = this.props
        return (
            <div>
                <h1>Hello,{loggedInUser.username}</h1>
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

}
export const Profile = connect(mapStateToProps)(_Profile)
