import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AnswersList } from '../cmps/AnswersList.jsx'
import { Progress } from '../cmps/Progress'
import {GameCountdown} from '../cmps/GameCountdown'
import { Loading } from './Loading.jsx'

class _GameOn extends Component {
    state = {
        isGameCountdown: true,
        currQuestionIdx: 0,
        wasQuestionAnswered: null,
        isNoAnswer:false,
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
        this.onTimeAlmostOver(this.tikSound,false)

    }
    onEsc = (event) => {
        if (event.keyCode === 27) this.props.history.push('/')
    }
    getRightAnswerIdx = idx => {
        const rightAnswerIdx = this.props.questions[idx].answers.findIndex(answer => answer.isCorrect === "true")
        this.setState({ correctAnsIdx: rightAnswerIdx })
    }
    answerQuestion = (answerResult, answerIdx) => {
        if (this.state.wasQuestionAnswered || !this.props.currTimeStamp) return
        const nextQuestionIdx = this.state.currQuestionIdx + 1
        this.setState({ chosenAnsIdx: answerIdx, wasQuestionAnswered: answerResult }, () => {
            this.props.onAns(answerResult)
        })
        this.onGoToNextQuestion(nextQuestionIdx)
    }
    onNoAns = () => {
        setTimeout(() =>{
            const nextQuestionIdx = this.state.currQuestionIdx + 1
            this.onGoToNextQuestion(nextQuestionIdx)
        },3000)
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
    dingSound = new Audio('../sounds/Ding.mp3')
    onTimeAlmostOver = (sound,value) => {
        if(value){
        sound.currentTime = 0;
        sound.play()
        }
        else{
            sound.pause()
        }
    }

    

    render() {
        let { questions,currTimeStamp,score,quizImg} = this.props
        let { currQuestionIdx,isGameCountdown,wasQuestionAnswered,chosenAnsIdx,correctAnsIdx } = this.state
        let currQuestion = questions[currQuestionIdx]
        const defaultImgUrl = 'https://res.cloudinary.com/dif8yy3on/image/upload/v1600433790/vqwcawytiymc8xjzdki6.png'
        if(currTimeStamp === 5000 )  this.onTimeAlmostOver(this.tikSound,true)
        if((currTimeStamp <= 5000 && wasQuestionAnswered) || (currTimeStamp === 0)) {
            this.onTimeAlmostOver(this.tikSound,false)
        } 
        if(!currTimeStamp){
            this.onNoAns()
            this.onTimeAlmostOver(this.tikSound,false)
            this.onTimeAlmostOver(this.dingSound,true)
        }

        const gameplay =

            <div>

                <div className="game-top">
                    <Progress value={currTimeStamp / 1000} max={15} />
                    <div className="score"><h2>Score: {score}</h2></div>
                    <div className="curr-question">
                        <h1 >{currQuestion.txt}</h1>
                    </div>
                    <img src={questions[currQuestionIdx].img || quizImg ||defaultImgUrl} />
                </div>
                <AnswersList chosenAnsIdx={chosenAnsIdx}
                    correctAnsIdx={correctAnsIdx}
                    wasQuestionAnswered={wasQuestionAnswered}
                    answerQuestion={this.answerQuestion}
                    answers={currQuestion.answers} 
                    currTimeStamp={currTimeStamp} />
            </div>


        if (!questions) return <div><Loading/></div>
        return (
            <main className="quiz-game-main main-container mt10">
                <div className="background-img">
                    <img src={`${quizImg}`} />
                </div>
                { isGameCountdown && 
                <GameCountdown onGameCountdownFinished={this.onGameCountdownFinished} />}
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
