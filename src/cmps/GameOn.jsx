import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'
import { AnswersList } from '../cmps/AnswersList.jsx'
// import { CountdownCircleTimer } from "react-countdown-circle-timer";

class _GameOn extends Component {
    state = {
        currQuestionIdx: 0,
        answerFeedback: null
    }
    answerQuestion = answerResult => {
        if (this.state.answerFeedback) return
        const nextQuestionIdx = this.state.currQuestionIdx + 1

        this.setState({ answerFeedback: answerResult }, () => {
            if (answerResult === "true") this.props.onTrueAns()
        })
        setTimeout(() => {
            if ((nextQuestionIdx) === this.props.questions.length) {
                this.props.onEndGame()
                return
            }

            this.setState({ currQuestionIdx: this.state.currQuestionIdx + 1, answerFeedback: null })
        }, 1500)
    }



    render() {
        const { questions } = this.props
        let { currQuestionIdx } = this.state
        let currQuestion = questions[currQuestionIdx]
        // console.log("render -> quizzes", quizzes)
        const answerDuration = 3

        if (!questions) return <div>Loading....</div>
        return (
            <main className="quiz-game-main">
                <div className="curr-question"><h1>{currQuestion.txt}</h1></div>
                <div className="answer-feedback" style={!this.state.answerFeedback ?
                    { visibility: 'hidden' } : { visibility: 'visible' }}><h2>{this.state.answerFeedback === 'true' ? 'Right!' : 'Wrong!'}</h2></div>
                <div className="timer-wrapper">
                    {/* <CountdownCircleTimer
                        key={key}
                        isPlaying
                        duration={answerDuration}
                        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                        onComplete={() => {
                            this.answerQuestion('false')
                            return [true, 1500]
                        }}
                    >
                    </CountdownCircleTimer> */}
                </div>
                <AnswersList answerFeedback={this.state.answerFeedback} answerQuestion={this.answerQuestion} answers={currQuestion.answers} />
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