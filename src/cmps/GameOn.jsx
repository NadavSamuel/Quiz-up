import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'
import { utilService } from '../services/utilService'
import { AnswersList } from '../cmps/AnswersList.jsx'
import { CircleTimer } from '../cmps/CircleTimer'
import { GameTimer } from '../cmps/GameTimer'
import { ProgressBar } from '../cmps/ProgressBar'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Howl, Howler } from 'howler';



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
            this.props.onAns(answerResult)
            // console.log('state: ', this.state)
        })
        setTimeout(() => {
            if ((nextQuestionIdx) === this.props.questions.length) {
                this.props.onEndGame()
                return
            }
            this.props.resetTimer()
            this.setState({ chosenAnsIdx: null, currQuestionIdx: this.state.currQuestionIdx + 1, answerFeedback: null, chosenAnswerIdx: null, didSoundPlay: false }, () => {
                // console.log('did sound play?, ',this.state.didSoundPlay)
                this.getRightAnswerIdx(nextQuestionIdx)
            })
        }, 1500)
    }



    // playSound = (str) => {
    //     if (str === 'true') {
    //         var sound = new Howl({
    //             src: ['./sounds/correct1.wav'],
    //         });
    //         this.setState({ didSoundPlay: true })
    //     }
    //     else if (str === 'false') {
    //         var sound = new Howl({
    //             src: ['./sounds/wrong.mp3'],
    //         });
    //         this.setState({ didSoundPlay: true },() =>{
    //             sound.play();
    //         })
    //         return

    //     }
    //     else if (str === 'bg')
    //         var sound = new Howl({
    //             src: ['./sounds/bg.wav'],
    //             autoplay: true,
    //             loop: true,
    //             volume: 0.2,
    //         });


    //     else
    //         var sound = new Howl({
    //             src: ['./sounds/end game.wav'],
    //         });

    //     sound.play();
    // }

    render() {
        // const [key, setKey] = useState(0);
        const { questions } = this.props
        let { currQuestionIdx } = this.state
        let currQuestion = questions[currQuestionIdx]
        const answerTimeLimit = 3
        // console.log("render -> quizzes", quizzes)
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

            },
        }))(LinearProgress);


        if (!questions) return <div>Loading....</div>
        return (
            <main className="quiz-game-main mt10">
                <div className="game-top">
                    <h2 className="score">{this.props.score}</h2>
                    <div className="curr-question"><h1>{currQuestion.txt}</h1></div>
                    <h3 className="game-timer"> <GameTimer currTimeStamp={this.props.currTimeStamp} /></h3>
                    <img src={this.props.questions[currQuestionIdx].img || 'https://res.cloudinary.com/dif8yy3on/image/upload/v1600433790/vqwcawytiymc8xjzdki6.png'} />
                    <BorderLinearProgress variant="determinate" value={(currQuestionIdx / questions.length) * 100} />
                    <ProgressBar completed={(currQuestionIdx / questions.length) * 100} />
                    <div className="timer-wrapper">
                    </div>
                </div>
                <AnswersList chosenAnsIdx={this.state.chosenAnsIdx}
                    correctAnsIdx={this.state.correctAnsIdx}
                    chosenAnswerIdx={this.state.chosenAnswerIdx}
                    answerFeedback={this.state.answerFeedback}
                    answerQuestion={this.answerQuestion}
                    answers={currQuestion.answers} />

                {/* {this.state.chosenAnsIdx && !this.state.didSoundPlay && this.playSound()} */}
                {/* {this.state.chosenAnsIdx && !this.state.didSoundPlay && (this.state.chosenAnsIdx !== this.state.correctAnsIdx) && this.playSound('false')} */}
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
{/* <CircleTimer ansSelected = {this.state.chosenAnsIdx}/> */ }
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