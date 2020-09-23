import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GameOn } from '../cmps/GameOn'
import { EndGame } from '../cmps/EndGame'
import { SetName } from '../cmps/SetName'
import { quizService } from '../services/quizService'
import { utilService } from '../services/utilService'
import { Loading } from '../cmps/Loading'
import { setNotification } from '../store/actions/notificationActions.js'


class _QuizGame extends Component {
    state = {
        quiz: {},
        currUser: null,
        gameOn: true,
        score: 0,
        rightAns: 0,
        currTimeStamp: 15000,
        gameSessionId: utilService.makeId(),
        wasQuestionAnswerd: false,
        isQuizReady: false,
        isSetName: false

    }
    timer = null

    componentDidMount() {
        window.scrollTo(0, 100)
        this.setCurrUser();
        this.loadQuizz();
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    setCurrUser = () => {
        this.setState({ currUser: this.props.loggedinUser }, () => {
            if (!this.state.currUser) this.setState({ isSetName: true })
            else this.timer = setInterval(this.setTimer, 1000);

        })
        // this.setState({ cu=>{rrUser: this.props.loggedinUser || this.getRandomUserObject()})
    }
    getCurrUnregisteredUser = (ev, username) => {
        ev.preventDefault()
        if (username.length < 3) {
            this.props.setNotification('err', 'Please enter a valid name')
            return
        }

        this.setState({
            currUser: {
                username,
                _id: utilService.makeId(),
            }, isSetName: false
        }, () => {
            this.timer = setInterval(this.setTimer, 1000)
        })
    }
    // getRandomUserObject = () =>{
    //     return { username: `guest ${utilService.makeId()}`, id: utilService.makeId() }
    // }
    getInitialState = () => {
        this.setState({
            ...this.state, gameOn: true, score: 0, rightAns: 0,
            currTimeStamp: 0, gameSessionId: utilService.makeId()
        }, () => {
            this.resetTimer()
            this.timer = setInterval(this.setTimer, 1000)

        })
    }
    resetTimer = () => {
        this.setState({ currTimeStamp: 1000, wasQuestionAnswerd: false })
    }

    setTimer = () => {
        this.updateTime()
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
        this.setState({ wasQuestionAnswerd: true, currTimeStamp: this.state.currTimeStamp }, () => {
            if (value === "true") {
                let reward = 15 - (15 - this.state.currTimeStamp / 1000)
                if (this.state.currTimeStamp === 0) reward = 1
                this.setState({ score: this.state.score + reward, rightAns: this.state.rightAns + 1, wasQuestionAnswerd: true }, () => {
                })
            } else {

                if (this.state.score - 5 === 0) return
                if (this.state.score - 5 < 0) {
                    this.setState({ score: 0 })
                    return
                }


                this.setState({ score: this.state.score - 5, })
            }
        })
    }

    onEndGame = () => {
        this.setState({ gameOn: false }, () => {
            clearInterval(this.timer)
        })
    }

    updateTime = () => {
        if (this.state.currTimeStamp === 0 || this.state.wasQuestionAnswerd) return
        if (this.state.gameOn) this.setState({ currTimeStamp: this.state.currTimeStamp - 1000 })
    }
    arrangeQuestions = () => {
        let questions = this.state.quiz.quests
        questions = utilService.shuffle(questions, true)
        this.setState({ questions, isQuizReady: true })
    }

    render() {
        const questions = this.state.quiz.quests


        if (!questions) return <Loading />
        return (
            <main className={this.state.isSetName && 'set-unregistered-container' || 'main-container'}>
                {(this.state.currUser === null && this.state.isSetName) &&
                    <SetName quizId={this.state.quiz._id}
                        getCurrUnregisteredUser={this.getCurrUnregisteredUser} />}
                { !this.state.isSetName && this.state.currUser && (this.state.gameOn && this.state.isQuizReady ?
                    <GameOn quizImg={this.state.quiz.img} resetTimer={this.resetTimer} isQuizReady={this.state.isQuizReady}
                        score={this.state.score} currTimeStamp={this.state.currTimeStamp}
                        onAns={this.onAns} questions={questions} onEndGame={this.onEndGame} /> :
                    <EndGame rightAns={this.state.rightAns} gameSessionId={this.state.gameSessionId}
                        currUser={this.state.currUser}
                        getInitialState={this.getInitialState} quiz={this.state.quiz}
                        currTimeStamp={this.state.currTimeStamp}
                        allTimesPlayers={this.state.quiz.allTimesPlayers}
                        category={this.state.quiz.tags[0]} score={this.state.score}
                        allAns={this.state.quiz.quests.length} />)}
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
    setNotification

}
export const QuizGame = connect(mapStateToProps, mapDispatchToProps)(_QuizGame)