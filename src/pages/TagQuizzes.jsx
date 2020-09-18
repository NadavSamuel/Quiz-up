import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { QuizList } from '../cmps/QuizList'
import { QuizFilter } from '../cmps/QuizFilter'
import { quizService } from '../services/quizService'

class _TagQuizzes extends Component {

    state = {
        filterBy: {},
        quizzes: [],
        sortBy: 'name',
    }

    componentDidUpdate(prevProps, prevState) {
        const tag = this.props.match.params.tag
        if(prevState.filterBy.title!==this.state.filterBy.title) this.loadQuizzes(tag);
    }



    componentDidMount() {
        const tag = this.props.match.params.tag
        console.log("componentDidMount -> tag", tag)
        this.loadQuizzes(tag);
    }


    loadQuizzes = async (tag) => {
        const quizzes = await quizService.getByTag(tag, this.state.filterBy);
        this.setState({ quizzes })
    }

    getFilterBy = (filterBy) => {
        this.setState({ filterBy }, () => console.log(this.state.filterBy))
    }

    render() {
        const quizzes = this.state.quizzes
        if (!quizzes) return <div>Loading....</div>
        return (
            <div className="">
                <QuizFilter getFilterBy={this.getFilterBy} />
                <QuizList next={this.next} prev={this.prev} quizzes={this.state.quizzes} />
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
export const TagQuizzes = connect(mapStateToProps, mapDispatchToProps)(_TagQuizzes)