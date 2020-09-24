import React, { Component } from 'react'
import { connect } from 'react-redux'
export default class _Room extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedInUser: this.props.loggedInUser
    }
}

export const Room = connect(mapStateToProps)(_Room)
