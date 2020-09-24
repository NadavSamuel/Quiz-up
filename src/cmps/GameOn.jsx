import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AnswersList } from '../cmps/AnswersList.jsx'
import { Progress } from '../cmps/Progress'
import { GameCountdown } from '../cmps/GameCountdown'

class _GameOn extends Component {
    state = {
        isGameCountdown: true,
        currQuestionIdx: 0,
        wasQuestionAnswered: null,
        correctAnsIdx: null,
        chosenAnsIdx: null,
        didSoundPlay: false
    }
    componentDidMount() {
        window.scrollTo(0, 74)
        document.addEventListener("keydown", this.onEsc, false);
        this.getRightAnswerIdx(0)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.onEsc, false);
        // this.onTimeAlmostOver(false)

    }
    onEsc = (event) => {
        if (event.keyCode === 27) this.props.history.push('/')

    }
    getRightAnswerIdx = idx => {
        const rightAnswerIdx = this.props.questions[idx].answers.findIndex(answer => answer.isCorrect === "true")
        this.setState({ correctAnsIdx: rightAnswerIdx })
    }
    answerQuestion = (answerResult, answerIdx) => {
        if (this.state.wasQuestionAnswered) return
        const nextQuestionIdx = this.state.currQuestionIdx + 1
        this.setState({ chosenAnsIdx: answerIdx, wasQuestionAnswered: answerResult }, () => {
            this.props.onAns(answerResult)
        })
        this.onGoToNextQuestion(nextQuestionIdx)
    }
    onNoAns = () => {
        const nextQuestionIdx = this.state.currQuestionIdx + 1

        this.onGoToNextQuestion(nextQuestionIdx)
    }
    onGoToNextQuestion = nextQuestionIdx => {
        setTimeout(() => {
            if ((nextQuestionIdx) === this.props.questions.length) {
                this.props.onEndGame()
                return
            }
            this.props.resetTimer()
            this.setState({ chosenAnsIdx: null, currQuestionIdx: nextQuestionIdx, wasQuestionAnswered: null, chosenAnswerIdx: null, didSoundPlay: false }, () => {
                this.getRightAnswerIdx(nextQuestionIdx)
            })
        }, 1500)
    }
    onGameCountdownFinished = () => {
        this.setState({ isGameCountdown: false }, () => {
            this.props.startGameTimer()
        })
    }
    tikSound = new Audio('../sounds/clock-tick2.wav')
    onTimeAlmostOver = value => {
        // console.log('hi!!!')
        if(value){
        this.tikSound.currentTime = 0;
        this.tikSound.play()
        }
        else{
            this.tikSound.pause()
        }
    }


    render() {
        let { questions,currTimeStamp } = this.props
        let { currQuestionIdx,isGameCountdown,wasQuestionAnswered } = this.state
        let currQuestion = questions[currQuestionIdx]
        currTimeStamp === 0 && this.onNoAns()
        // currTimeStamp === 5000 && this.onTimeAlmostOver(true)
        // ((currTimeStamp <= 5000 && wasQuestionAnswered) || (currTimeStamp === 0))  && this.onTimeAlmostOver(false)

        const gameplay =

            <div>

                <div className="game-top">
                    <Progress value={this.props.currTimeStamp / 1000} max={15} />
                    <div className="score"><h2>Score: {this.props.score}</h2></div>
                    <div className="curr-question">
                        <h1 >{currQuestion.txt}</h1>
                    </div>
                    <img src={this.props.questions[currQuestionIdx].img || this.props.quizImg || 'https://res.cloudinary.com/dif8yy3on/image/upload/v1600433790/vqwcawytiymc8xjzdki6.png'} />
                    <div className="timer-wrapper">
                    </div>
                </div>
                <AnswersList chosenAnsIdx={this.state.chosenAnsIdx}
                    correctAnsIdx={this.state.correctAnsIdx}
                    chosenAnswerIdx={this.state.chosenAnswerIdx}
                    wasQuestionAnswered={this.state.wasQuestionAnswered}
                    answerQuestion={this.answerQuestion}
                    answers={currQuestion.answers} />
            </div>


        if (!questions) return <div>Loading....</div>
        return (
            <main className="quiz-game-main main-container mt10">
                <div className="background-img">
                    <img src={`${this.props.quizImg}`} />
                </div>
                { isGameCountdown && <GameCountdown onGameCountdownFinished={this.onGameCountdownFinished} />}
                {!isGameCountdown && gameplay}
            </main>
        )
    }
}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {

}
export const GameOn = connect(mapStateToProps, mapDispatchToProps)(_GameOn)
