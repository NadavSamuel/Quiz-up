import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'
import { AnswersList } from '../cmps/AnswersList.jsx'

class _GameOn extends Component {
    state = {
        currQuestionIdx: 0,
        answerFeedback: null
    }

    // componentDidMount() {
    //    this.loadQuestions();
    // }

    // loadQuizzes =()=>{
    //     const quizzes= quizService.query();
    //     this.setState({quizzes})
    // }
    answerQuestion = answerResult => {
        const nextQuestionIdx =this.state.currQuestionIdx+1

        this.setState({ answerFeedback: answerResult }, () => console.log(this.state.answerFeedback))
        setTimeout(() => {
            if((nextQuestionIdx) === this.props.questions.length) {
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

        if (!questions) return <div>Loading....</div>
        return (
            <main className="quiz-game-main">
                <div className="curr-question"><h1>{currQuestion.txt}</h1></div>
                <div className="answer-feedback" style={!this.state.answerFeedback ? { visibility: 'hidden' } : { visibility: 'visible' }}><h2>{this.state.answerFeedback === 'true' ? 'Right!' : 'Wrong!'}</h2></div>
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