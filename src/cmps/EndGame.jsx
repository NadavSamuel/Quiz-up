import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RankTable } from '../cmps/RankTable'
import { quizService } from '../services/quizService'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { tada } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { Link } from 'react-router-dom'
import { utilService } from '../services/utilService';
import { setNotification } from '../store/actions/notificationActions';

export class _EndGame extends Component {
    state = {
        review: {
            by: {
                fullName: '',
                imgUrl: '',
                _id: ''
            },
            txt: '',
            rate: 5,
            id: utilService.makeId()

        }
        , isReviewSent: false,
        idxInRankTable: null,
        tenBestPlayers: []
    }
    componentDidMount() {
        this.updateAllTimePlayers()
        this.setReviewComposer()
    }

    setReviewComposer = () => {
        this.setState({
            review: {
                ...this.state.review, by: {
                    fullName: this.props.currUser.username,
                    imgUrl: this.props.currUser.img,
                    _id: this.props.currUser.id
                }
            }
        })
    }
    handleReviewChange = ({ target }) => {
        const { name, value } = target
        this.setState({ ...this.state, review: { ...this.state.review, txt: value } })
    }
    updateAllTimePlayers = () => {
        const { currUser, gameSessionId, score, quiz } = this.props
        const currUserMiniObject = {
            fullName: currUser.username,
            id: currUser._id,
            img: currUser.img,
            score,
            gameSessionId
        }
        // if (!currUserMiniObject.score) return
        quiz.allTimesPlayers.unshift(currUserMiniObject)
        quizService.update(quiz)
        const { tenBestPlayers, playerRank } = utilService.getBestUsers(quiz, currUserMiniObject.gameSessionId)
        let playerPositionInTable = tenBestPlayers.findIndex(player => player.gameSessionId === currUserMiniObject.gameSessionId)
        if (playerPositionInTable !== -1) {
            playerPositionInTable++
            this.setState({ idxInRankTable: playerPositionInTable, tenBestPlayers })
        }
        else this.setState({ idxInRankTable: playerRank + 1, tenBestPlayers })
    }
    onSubmitReview = ev => {
        ev.preventDefault()

        if (this.state.isReviewSent) {
            this.props.setNotification('err', 'You Already Sent Review!')
            return
        }
        const currQuiz = this.props.quiz
        currQuiz.reviews.unshift(this.state.review)
        quizService.update(currQuiz)
        this.setState({ isReviewSent: true, review:{...this.state.review,txt:'' }}, () => {
            this.props.setNotification('info', 'Review Sent!')
        })
    }
    changeRate = num => {
        this.setState({ review: { ...this.state.review, rate: num } })
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
        return <div className='flex justify-around'>

            {arr.map((i, idx) =>
                <div key={idx} className="cursor-pointer" >
                    <StarIcon onClick={() => { this.changeRate(idx + 1) }} />
                    <i onClick={() => { this.changeRate(idx + 1) }} className="fas fa-star"></i>
                </div>
            )}
            {fiveMinusArr.map((i, idx) =>
                <div key={idx} className="cursor-pointer">
                    <StarBorderIcon onClick={() => { this.changeRate(this.state.review.rate + idx + 1) }} />
                    {/* <i onClick={() => { this.changeRate(this.state.rate + idx + 1) }} className="far fa-star"></i> */}
                </div>
            )}
        </div>
    }

    render() {
        const { totalRightAnswers, allAns, category, allTimesPlayers, currTimeStamp, quiz, score, players,getInitialState } = this.props
        const { idxInRankTable, tenBestPlayers } = this.state
        const styles = {
            tada: {
                animation: 'x 2s',
                animationName: Radium.keyframes(tada, 'tada')
            }
        }
        const isDisplayGreet = { display: idxInRankTable <= 10 ? 'inlineBlock' : 'none' }
        const reviewForm = <form onSubmit={this.onSubmitReview}>
            <label htmlFor="review">Review this quiz:</label>
            <textarea onChange={this.handleReviewChange} value={this.state.review.txt} placeholder="your review here" id="review" name="review" rows="4" cols="50">
            </textarea>
            {this.getRate(this.state.review.rate)}
            <button>Send Review</button>
        </form>

        function getRankPlaceGood(number) {
            if (number === 1) return '1st'
            if (number === 2) return '2nd'
            if (number === 3) return '3rd'
            else return number + 'th'
        }
        // You answered one of the 5 questions correctly
        return (
            <main className="endgame-main" >
                <div className="endgame-top"> <h1> <span style={isDisplayGreet}>Wow!</span> You scored {this.props.score}</h1>
                    <h3 className="mt30">You answered right {totalRightAnswers || '0'} of  {allAns} questions correctly <br />
                    </h3>
                    
                    {idxInRankTable &&  <StyleRoot>
                        <div className="game-records-break mt30">
                            
                            {(score>0) && <h2 style={idxInRankTable <= 10 && styles.tada || styles.null}>
                                <span className="top-ten-greet" style={isDisplayGreet}>
                                    Congratulations!</span> You are {getRankPlaceGood(idxInRankTable)} place in the "{quiz.title}" quiz! </h2>}
                        </div>
                    </StyleRoot>}

                    {players && < div className="online-game mt10">
                        <RankTable bestPlayers={players} />
                    </div>}
                    <div className="mt30">
                        <RankTable bestPlayers={tenBestPlayers} />
                    </div>
                    <div className="endgame-actions mt30" >
                        <div className="btns">

                        {!players && <button  onClick={getInitialState}>Play Again</button>}
                        <button className="back-btn"><Link to='/browse'> Back to Browse</Link></button></div>
                        {reviewForm}


                    </div>
                </div>
            </main>
        )
    }
}
const mapStateToProps = state => {
    return {
        // loggedinUser: state.userReducer.loggedinUser
    }
}
const mapDispatchToProps = {
    setNotification

}
export const EndGame = connect(mapStateToProps, mapDispatchToProps)(_EndGame)
