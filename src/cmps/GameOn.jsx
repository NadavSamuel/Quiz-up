import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'
import { AnswersList } from '../cmps/AnswersList.jsx'
import { CircleTimer } from '../cmps/CircleTimer'
import { GameTimer } from '../cmps/GameTimer'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


class _GameOn extends Component {
    state = {
        currQuestionIdx: 0,
        answerFeedback: null,
        // chosenAnswerIdx: null,
        correctAnsIdx: null,
        chosenAnsIdx: null
    }
    componentDidMount() {
        this.getRightAnswerIdx(0)
    }

    getRightAnswerIdx = idx => {
        const rightAnswerIdx = this.props.questions[idx].answers.findIndex(answer => answer.isCorrect === "true")
        this.setState({ correctAnsIdx: rightAnswerIdx })
    }
    answerQuestion = (answerResult, answerIdx) => {
        if (this.state.answerFeedback) return
        const nextQuestionIdx = this.state.currQuestionIdx + 1
        // this.setState({ chosenAnsIdx: answerIdx, answerFeedback: answerResult, chosenAnswerIdx: answerIdx }, () => {
        this.setState({ chosenAnsIdx: answerIdx, answerFeedback: answerResult }, () => {
            if (answerResult === "true") this.props.onTrueAns()
            console.log('state: ', this.state)
        })
        setTimeout(() => {
            if ((nextQuestionIdx) === this.props.questions.length) {
                this.props.onEndGame()
                return
            }
            this.setState({ chosenAnsIdx: null, currQuestionIdx: this.state.currQuestionIdx + 1, answerFeedback: null, chosenAnswerIdx: null }, () => {
                this.getRightAnswerIdx(nextQuestionIdx)
            })
        }, 1500)
    }


    render() {
        // const [key, setKey] = useState(0);
        const { questions } = this.props
        let { currQuestionIdx } = this.state
        let currQuestion = questions[currQuestionIdx]
        const answerTimeLimit = 3
        // console.log("render -> quizzes", quizzes)
        // const answerDuration = 3
        const BorderLinearProgress = withStyles((theme) => ({
            root: {
                height: 10,
                borderRadius: 5,
            },
            colorPrimary: {
                backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
            },
            bar: {
                borderRadius: 5,
                backgroundColor: '#07689f',
                animationDuration: '550ms'
            },
        }))(LinearProgress);


        if (!questions) return <div>Loading....</div>
        return (
            <main className="quiz-game-main">
                <BorderLinearProgress variant="determinate" value={(currQuestionIdx / questions.length) * 100} />
                <div className="curr-question"><h1>{currQuestion.txt}</h1></div>
                {/* <div className="answer-feedback" style={!this.state.answerFeedback ?
                    { visibility: 'hidden' } : { visibility: 'visible' }}><h2>{this.state.answerFeedback === 'true' ? 'Right!' : 'Wrong!'}</h2></div> */}

                <div className="timer-wrapper">
                    <GameTimer currTimeStamp={this.props.currTimeStamp}/>
                    {/* <CircleTimer ansSelected = {this.state.chosenAnsIdx}/> */}
                    {/* <CountdownCircleTimer
                        key={key}
                        isPlaying
                        duration={answerTimeLimit}
                        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                        onComplete={() => {
                            this.answerQuestion('false')
                            return [true, 1500]
                        }}
                    >
                    </CountdownCircleTimer> */}
                </div>
                <AnswersList chosenAnsIdx={this.state.chosenAnsIdx} correctAnsIdx={this.state.correctAnsIdx} chosenAnswerIdx={this.state.chosenAnswerIdx} answerFeedback={this.state.answerFeedback} answerQuestion={this.answerQuestion} answers={currQuestion.answers} />
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