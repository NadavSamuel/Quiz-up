import React, { Component } from 'react'
import { connect } from 'react-redux'

class _OnlineGame extends Component {

    state = {
        quiz:null
    }

    componentDidMount() {
      

    }


    render() {
        
        if (!quiz) return <Loading />
        return (
            <div className="waitting-room">
                
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {

}
export const OnlineGame = connect(mapStateToProps, mapDispatchToProps)(_QuizApp)