import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'
import { utilService } from '../services/utilService'
import { utils } from '../services/utils'

class _QuizApp extends Component {

    state = {
        quizzes: [],
        tagCount: 0
    }

    componentDidMount() {
        this.loadQuizzes();
    }

    loadQuizzes = async () => {
        const quizzes = await quizService.query();
        this.setState({ quizzes })
    }

    render() {
        const quizzes = this.state.quizzes
        if (!quizzes) return <div>Loading....</div>
        return (
            <div className="home-page full">
                <img className="home-page-img" src="https://res.cloudinary.com/dif8yy3on/image/upload/v1600269447/x5bvokrzpyqjtzbz0lmd.gif" alt="" />
                <h1>Play quizzes. Challenge your friends. Have fun</h1>
                    <h3 className='tag-title'>Most popular:</h3>
                    <QuizList   quizzes={utilService.getMostPopular(quizzes)} />
                    <h3 className='tag-title'>Top rated:</h3>
                    <QuizList  quizzes={utilService.getTopRated(quizzes)} />
                    <h3 className='tag-title'>Random:</h3>
                    <QuizList  quizzes={utilService.getRandom(quizzes)} />
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
export const QuizApp = connect(mapStateToProps, mapDispatchToProps)(_QuizApp)