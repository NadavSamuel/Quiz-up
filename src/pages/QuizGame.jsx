import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GameOn } from '../cmps/GameOn'
import { EndGame } from '../cmps/EndGame'
import { SetName } from '../cmps/SetName'
import { quizService } from '../services/quizService'
import { utilService } from '../services/utilService'
import { Loading } from '../cmps/Loading'
import { setNotification } from '../store/actions/notificationActions.js'
import { Room } from './Room'

class _QuizGame extends Component {
    state = {
        quiz: {},
        currUser: null,
        gameOn: true,
        score: 0,
        totalRightAnswers: 0,
        currTimeStamp: 15000,
        gameSessionId: utilService.makeId(),
        wasQuestionAnswerd: false,
        isQuizReady: false,
        isSetName: false,
        onlineId: '',
        isWaitingRoom:false
    }
    timer = null

    componentDidMount() {
        const { onlineId } = this.props.match.params
        if (onlineId) this.setState({ onlineId })
        window.scrollTo(0, 100)
        this.setCurrUser();
        this.determinOnline(onlineId)
        this.loadQuizz();

    }
    componentWillUnmount() {
        this.stopTimer()
    }

    stopTimer = (value = false) =>{
        clearInterval(this.timer)
        if(value) this.setState({currTimeStamp:-1})
    }

    setCurrUser = () => {
        this.setState({ currUser: this.props.loggedinUser }, () => {
            if (!this.state.currUser) this.setState({ isSetName: true })
        })
    }

    startGameTimer = () => {
        clearInterval(this.timer)
        this.timer = setInterval(this.setTimer, 1000);
    }

    getCurrUnregisteredUser = (ev, username) => {
        const { onlineId } = this.state
        ev.preventDefault()
        if (username.length < 2) {
            this.props.setNotification('err', 'Please enter a valid name')
            return
        }
        if (!onlineId) {
            this.setState({
                currUser: {
                    username,
                    _id: utilService.makeId(),
                }, isSetName: false
            })
        }
        else {
            this.setState({
                gameOn: false,
                currUser: {
                    username,
                    _id: utilService.makeId(),
                }, isSetName: false
            })
        }
    }

    getInitialState = () => {
        this.setState({
            ...this.state, gameOn: true, score: 0, totalRightAnswers: 0,
            currTimeStamp: 0, gameSessionId: utilService.makeId()
        }, () => {
            this.resetTimer()
            this.timer = setInterval(this.setTimer, 1000)

        })
    }

    resetTimer = () => {
        clearInterval(this.timer)
        this.setState({ currTimeStamp: 15000, wasQuestionAnswerd: false }, () => {
            console.log('currTimeStamp, ', this.state.currTimeStamp)
        })
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
    determinOnline = (value) =>{
        debugger
        // const isOnline = (value === 'online')
        if(value) this.setState({isWaitingRoom:value })
       
    }
    onAns = value => {
        this.setState({ wasQuestionAnswerd: true, currTimeStamp: this.state.currTimeStamp }, () => {
            if (value === "true") {
                let reward = 15 - (15 - this.state.currTimeStamp / 1000)
                if (this.state.currTimeStamp === 0) reward = 1
                this.setState({ score: this.state.score + reward, totalRightAnswers: this.state.totalRightAnswers + 1, wasQuestionAnswerd: true }, () => {
                })
            } else {
                if (this.state.score - 5 <= 0) {
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
    onEscInGameOn = () => {
        this.props.history.push(`/`)
    }

    render() {
        const questions = this.state.quiz.quests
        const { currUser, isSetName, gameOn, isQuizReady, quiz, score,
        currTimeStamp, gameSessionId, totalRightAnswers, onlineId,isWaitingRoom } = this.state
        const { img, allTimesPlayers } = quiz
        const { history } = this.props
        const isInSetName = (this.state.isSetName && 'set-unregistered-container' || 'main-container')

        if (!questions) return <Loading />
        return (
            <main onKeyDown={this.onEsc} className={isInSetName}>
                {(!currUser && isSetName) &&
                    <SetName quizId={this.state.quiz._id}
                        getCurrUnregisteredUser={this.getCurrUnregisteredUser} />}

                {(currUser && onlineId && !gameOn && isWaitingRoom ) && 
                <Room gameSessionId={gameSessionId} currUser={currUser} />}



                {  (!isSetName && currUser && isQuizReady &&!isWaitingRoom) && (gameOn  ?
                    <GameOn stopTimer ={this.stopTimer} startGameTimer={this.startGameTimer}
                        history={history}
                        onEsc={this.onEsc} quizImg={img} resetTimer={this.resetTimer}
                        isQuizReady={isQuizReady}
                        score={score} currTimeStamp={currTimeStamp}
                        onAns={this.onAns} questions={questions} onEndGame={this.onEndGame} /> :

                    <EndGame setNotification={this.props.setNotification}
                        totalRightAnswers={totalRightAnswers} 
                        gameSessionId={gameSessionId}
                        currUser={currUser}
                        getInitialState={this.getInitialState} quiz={this.state.quiz}
                        currTimeStamp={currTimeStamp}
                        allTimesPlayers={allTimesPlayers}
                        category={this.state.quiz.tags[0]} score={score}
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