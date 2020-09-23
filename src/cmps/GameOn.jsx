import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AnswersList } from '../cmps/AnswersList.jsx'
import { Progress } from '../cmps/Progress'



class _GameOn extends Component {
    state = {
        currQuestionIdx: 0,
        answerFeedback: null,
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
    }
    onEsc = (event) => {
        if (event.keyCode === 27) this.props.history.push('/')
        
    }
    getRightAnswerIdx = idx => {
        const rightAnswerIdx = this.props.questions[idx].answers.findIndex(answer => answer.isCorrect === "true")
        this.setState({ correctAnsIdx: rightAnswerIdx })
    }
    answerQuestion = (answerResult, answerIdx) => {
        if (this.state.answerFeedback) return
        const nextQuestionIdx = this.state.currQuestionIdx + 1
        this.setState({ chosenAnsIdx: answerIdx, answerFeedback: answerResult }, () => {
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
            this.setState({ chosenAnsIdx: null, currQuestionIdx: nextQuestionIdx, answerFeedback: null, chosenAnswerIdx: null, didSoundPlay: false }, () => {
                this.getRightAnswerIdx(nextQuestionIdx)
            })
        }, 1500)
    }


    render() {
        const { questions } = this.props
        let { currQuestionIdx } = this.state
        let currQuestion = questions[currQuestionIdx]
        this.props.currTimeStamp === 0 && this.onNoAns()



        if (!questions) return <div>Loading....</div>
        return (
            <main  className="quiz-game-main main-container mt10">
                <div className="background-img">
                    <img src={`${this.props.quizImg}`}/>
                </div>
                <div className="game-top">
                    <Progress value={this.props.currTimeStamp / 1000} max={15} />
                    <div className="score"><h2>Score: {this.props.score}</h2></div>
                    <div className="curr-question"><h1>{currQuestion.txt}</h1></div>
                    <img src={this.props.questions[currQuestionIdx].img || this.props.quizImg || 'https://res.cloudinary.com/dif8yy3on/image/upload/v1600433790/vqwcawytiymc8xjzdki6.png'} />
                    <div className="timer-wrapper">
                    </div>
                </div>
                <AnswersList chosenAnsIdx={this.state.chosenAnsIdx}
                    correctAnsIdx={this.state.correctAnsIdx}
                    chosenAnswerIdx={this.state.chosenAnswerIdx}
                    answerFeedback={this.state.answerFeedback}
                    answerQuestion={this.answerQuestion}
                    answers={currQuestion.answers} />
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
