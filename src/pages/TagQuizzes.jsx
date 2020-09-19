import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { QuizList } from '../cmps/QuizList'
import { QuizFilter } from '../cmps/QuizFilter'
import { quizService } from '../services/quizService'
import { QuizListFull } from '../cmps/QuizListFull'
import { QuizSort } from '../cmps/QuizSort'

class _TagQuizzes extends Component {

    state = {
        filterBy: {},
        quizzes: [],
        sortBy: '',
    }

    componentDidUpdate(prevProps, prevState) {
        const tag = this.props.match.params.tag
        if (prevState.filterBy.title !== this.state.filterBy.title) this.loadQuizzes(tag);
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

    setSortBy = (sortBy) => {
        var quizzes = [...this.state.quizzes]
        if (this.state.sortBy === sortBy) {
            quizzes = quizzes.reverse();
        } else if (sortBy === 'title') {
            quizzes = quizzes.sort((quiz1, quiz2) => {
                if (quiz1.title.toLowerCase() > quiz2.title.toLowerCase()) return 1
                if (quiz1.title.toLowerCase() < quiz2.title.toLowerCase()) return -1
                else return 0
            })
        } else if (sortBy === 'difficulity') {
            quizzes = quizzes.sort((quiz1, quiz2) => quiz1[sortBy] - quiz2[sortBy])
        } else if (sortBy === 'popularity') {
            quizzes = quizzes.sort((quiz1, quiz2) => {
                return quiz2.allTimesPlayers.length - quiz1.allTimesPlayers.length
            })
        } else if (sortBy === 'rate') {
            quizzes = quizzes.sort((quiz1, quiz2) => {
                const rate1= this.getRate(quiz1)
                const rate2= this.getRate(quiz2)
                if(isNaN(rate1) && isNaN(rate2|| rate1===rate2))return 0
                if(isNaN(rate1) || rate1<rate2) return -1
                if(isNaN(rate2) || rate1>rate2)return 1
            })
        }
        this.setState({ quizzes, sortBy })
    }

    getRate(quiz) {
        const sum = quiz.reviews.reduce((acc, review) => {
            return acc + review.rate
        }, 0)

        return (sum / quiz.reviews.length).toFixed(2);
    }

    render() {
        const quizzes = this.state.quizzes
        if (!quizzes) return <div>Loading....</div>
        return (
            <div className="">
                <QuizFilter getFilterBy={this.getFilterBy} />
                <QuizSort setSortBy={this.setSortBy} />
                <QuizListFull quizzes={this.state.quizzes} />
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