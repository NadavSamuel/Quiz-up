import React, { Component } from 'react'
import { RankTable } from '../cmps/RankTable'
import { quizService } from '../services/quizService'
import { GameTimer } from '../cmps/GameTimer'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { tada } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { utilService } from '../services/utilService';

export class EndGame extends Component {
    state = {
        review: {
            by: {
                fullName: "user2",
                imgUrl: "/img/img2.jpg",
                _id: "u102"
            },
            txt: '',
            rate: 2,
            id: 123321

        }
        , isReviewSent: false,
        idxInRankTable:null
    }
    componentDidMount() {
        this.updateAllTimePlayers()
    }
    handleReviewChange = ({ target }) => {
        const { name, value } = target
        this.setState({ ...this.state, review: { ...this.state.review, txt: value } })
    }
    updateAllTimePlayers = () => {
        const currQuiz = this.props.quiz
        const currUser =  this.props.currUser
        const currUserMiniObject = {
            fullName:currUser.username,
            id:currUser._id,
            img:currUser.img,
            score: this.getFinalScore(),
            gameSessionId:this.props.gameSessionId
        }
        currQuiz.allTimesPlayers.unshift(currUserMiniObject)
        quizService.update(currQuiz)
        const bestPlayers = utilService.getBestUsers(currQuiz)
        const playerPositionInTable = bestPlayers.findIndex(player => player.gameSessionId === currUserMiniObject.gameSessionId )
        if(playerPositionInTable !== -1) this.setState({idxInRankTable:playerPositionInTable+1},()=>{
            // console.log('playerPositionInTable',playerPositionInTable)
            // console.log('allTimesPlayers', currQuiz.allTimesPlayers)
            this.forceUpdate()
        })
 
        // console.log('currQuiz in EndGame after force update: ',this.props.quiz)
        this.forceUpdate()
    }
    onSubmitReview = ev => {
        ev.preventDefault()
        const currQuiz = this.props.quiz
        currQuiz.reviews.unshift(this.state.review)
        quizService.update(currQuiz)
        this.setState({ isReviewSent: true })
    }
    changeRate = num => {
        this.setState({ review: { ...this.state.review, rate: num } })
        // this.setState(...this.state,review:{...this.state.review,rate:num})
    }
    getFinalScore = () => {
        const timeStampInSecs = this.props.currTimeStamp / 1000
        const { allAns } = this.props
        function calaTimeBonus(secs) {
            if (allAns < 6) return 0
            if (secs <= 40) return 40
            if (secs <= 45) return 30
            if (secs <= 60) return 20
            if (secs <= 75) return 10
        }
        const gameTimeCalc = calaTimeBonus(timeStampInSecs)
        const finalScore = this.props.rightAns * 10 + gameTimeCalc
        return finalScore
    }
    getRate = (num) => {
        var arr = []
        var fiveMinusArr = []
        for (let i = 0; i < num; i++) {
            arr.push(i);
        }
        for (let i = 0; i < 5 - num; i++) {
            fiveMinusArr.push(i)

        }
        return <div className='flex justify-around cursor-pointer'>

            {arr.map((i, idx) =>
                <div key={idx} >
                    <StarIcon onClick={() => { this.changeRate(idx + 1) }} />
                    <i onClick={() => { this.changeRate(idx + 1) }} className="fas fa-star"></i>
                </div>
            )}
            {fiveMinusArr.map((i, idx) =>
                <div key={idx}>
                    <StarBorderIcon onClick={() => { this.changeRate(this.state.review.rate + idx + 1) }} />
                    {/* <i onClick={() => { this.changeRate(this.state.rate + idx + 1) }} className="far fa-star"></i> */}
                </div>
            )}
        </div>
    }

    render() {

        const styles = {
            tada: {
                animation: 'x 2s',
                animationName: Radium.keyframes(tada, 'tada')
            }
        }
        const { rightAns, allAns, category, allTimesPlayers, currTimeStamp, quiz } = this.props
        const bestPlayers = utilService.getBestUsers(quiz)
        const reviewForm = <form onSubmit={this.onSubmitReview}>
            <label htmlFor="review">Review this quiz:</label>
            <textarea onChange={this.handleReviewChange} value={this.state.review.txt} placeholder="your review here" id="review" name="review" rows="4" cols="50">
            </textarea>
            {this.getRate(this.state.review.rate)}
            <button>sendReview</button>
        </form>
        const reviewFeedback = <div>
            <p>Thank you for writing a review! </p>
        </div>
        // console.log('curr time stamp in endGame: ',currTimeStamp)
        function getRankPlaceGood(number){
            if (number === 1) return '1st'
            if (number === 2) return '2nd'
            if (number === 3) return '3rd'
            else return number+'th'
        }

        return (
            <main className="endgame-main" >
                <div className="endgame-top"> <h1>Wow! you scored {this.getFinalScore()}</h1>
                    <h3 className="mt30">you answered {rightAns} answeres right out of {allAns} questions <br /> you did it in <GameTimer currTimeStamp={this.props.currTimeStamp} /></h3>
                    <StyleRoot>
                       { this.state.idxInRankTable && <div className="game-records-break mt30"> 
                        <h2 style={styles.tada}>Congratulations! you are {getRankPlaceGood(this.state.idxInRankTable) } place in the {category} category! </h2>
                        </div>}
                    </StyleRoot>
                    <div className="mt30">
                    <RankTable  bestPlayers={bestPlayers} />
                    </div>
                    <div className="endgame-actions mt30" >
                        <button onClick={this.props.getInitialState}>Play again</button>
                        <button><Link to='/browse'> back to browse</Link></button>
                        {!this.state.isReviewSent ? reviewForm : reviewFeedback}
                    </div>
                </div>
            </main>
        )
    }
}
