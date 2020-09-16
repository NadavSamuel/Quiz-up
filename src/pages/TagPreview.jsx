import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'

class _TagPreview extends Component {

    state = {
        filterBy:{},
        quizzes: [],
        sortBy:'name'
    }

    componentDidMount() {
        const tagId=this.props.match.params.tagId
        console.log("componentDidMount -> tagId", tagId)
        this.loadQuizzes();
    }


    loadQuizzes = () => {
        const quizzes = quizService.query();
        this.setState({ quizzes })
    }

    render() {
        const quizzes = this.state.quizzes
        if (!quizzes) return <div>Loading....</div>
        return (
            <div className="home-page">
                <QuizList next={this.next} prev={this.prev} quizzes={this.state.quizzes}  />
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
export const TagPreview = connect(mapStateToProps, mapDispatchToProps)(_TagPreview)