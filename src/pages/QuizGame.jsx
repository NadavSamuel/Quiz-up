import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { QuizList } from '../cmps/QuizList'
import { GameOn } from '../cmps/GameOn'
import { EndGame } from '../cmps/EndGame'
import { quizService } from '../services/quizService'
import { utilService } from '../services/utilService'
import { userService } from '../services/userService'
import { AnswersList } from '../cmps/AnswersList.jsx'

class _QuizGame extends Component {
    state = {
        quiz: {},
        currUser: this.props.loggedinUser || { username: `guest ${utilService.makeId()}`, _id: utilService.makeId() },
        gameOn: true,
        score: 0,
        rightAns: 0,
        currTimeStamp: 0,
        gameSessionId: utilService.makeId(),
        isQuizReady: false

    }

    componentDidMount() {
        this.loadQuizz();
        this.setTimer();

    }
    getInitialState = () => {
        this.setState({
            ...this.state, gameOn: true, score: 0, rightAns: 0,
            currTimeStamp: 0, gameSessionId: utilService.makeId(),
            currUser: this.props.loggedinUser || { fullName: `guest ${utilService.makeId()}`, id: utilService.makeId() }
        }, () => { this.setTimer() })
    }

    setTimer = () => {
        const timer = setInterval(() => {
            this.updateTime()
            if (!this.state.gameOn) clearInterval(timer)
        }, 1000)
    }

    loadQuizz = async () => {
        const quiz = await quizService.getById(this.props.match.params.quizId)
        quiz.quests.forEach(quest => {
            utilService.shuffle(quest.answers)

        })
        this.setState({ quiz }, () => {
            this.arrangeQuestions()
        })
    }
    onAns = value => {
        if (value === "true") {
            this.setState({ score: this.state.score + 10, rightAns: this.state.rightAns + 1 }, () => {
                // console.log('props ', this.props)
                console.log('state in main ', this.state)
            })
        } else {
            if (this.state.score === 0) return
            this.setState({ score: this.state.score - 5 }, () => { console.log('state in main ', this.state) })


        }
    }
    answerQuestion = answerResult => {

        this.setState({ answerFeedback: answerResult })
        setTimeout(() => {

            this.setState({ currQuestionIdx: this.state.currQuestionIdx + 1, answerFeedback: null })
        }, 1500)
    }
    onEndGame = () => {
        this.setState({ gameOn: false })
    }


    /////////////////////// Timer funcs
    updateTime = () => {
        if (this.state.gameOn) this.setState({ currTimeStamp: this.state.currTimeStamp + 1000 })
        // return true
    }
    ///////////////////////
    arrangeQuestions = () => {
        let questions = this.state.quiz.quests
        questions = utilService.shuffle(questions, true)
        this.setState({ questions, isQuizReady: true })
    }

    render() {
        // console.log('currQuiz: ', this.state.quiz)
        const questions = this.state.quiz.quests
        let { currQuestionIdx } = this.state
        // console.log("render -> quizzes", quizzes)

        if (!questions) return <div>Loading....</div>
        return (
            <main>
                {this.state.gameOn && this.state.isQuizReady ? <GameOn isQuizReady={this.state.isQuizReady} score={this.state.score} currTimeStamp={this.state.currTimeStamp} onAns={this.onAns} questions={questions} onEndGame={this.onEndGame} /> :
                    <EndGame rightAns={this.state.rightAns} gameSessionId={this.state.gameSessionId} currUser={this.state.currUser}
                        getInitialState={this.getInitialState} quiz={this.state.quiz}
                        currTimeStamp={this.state.currTimeStamp} allTimesPlayers={this.state.quiz.allTimesPlayers}
                        category={this.state.quiz.tags[0]} score={this.state.score}
                        allAns={this.state.quiz.quests.length} />}
            </main>
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
export const QuizGame = connect(mapStateToProps, mapDispatchToProps)(_QuizGame)