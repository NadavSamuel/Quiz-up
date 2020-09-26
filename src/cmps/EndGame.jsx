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
            this.props.setNotification('err', 'You already sent a review!')
            return
        }
        const currQuiz = this.props.quiz
        currQuiz.reviews.unshift(this.state.review)
        quizService.update(currQuiz)
        this.setState({ isReviewSent: true }, () => {
            this.props.setNotification('info', 'Review sent')
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
        const { rightAns, allAns, category, allTimesPlayers, currTimeStamp, quiz, score,players} = this.props
        const { idxInRankTable, tenBestPlayers } = this.state
        // const {tenBestPlayers} = utilService.getBestUsers(quiz)
        const reviewForm = <form onSubmit={this.onSubmitReview}>
            <label htmlFor="review">Review this quiz:</label>
            <textarea onChange={this.handleReviewChange} value={this.state.review.txt} placeholder="your review here" id="review" name="review" rows="4" cols="50">
            </textarea>
            {this.getRate(this.state.review.rate)}
            <button>Send Review</button>
        </form>
        const reviewFeedback = <div className="review-feedback">
            <p>Thank you for writing a review! </p>
        </div>
        function getRankPlaceGood(number) {
            if (number === 1) return '1st'
            if (number === 2) return '2nd'
            if (number === 3) return '3rd'
            else return number + 'th'
        }

        return (
            <main className="endgame-main" >
                <div className="endgame-top"> <h1> <span style={{ display: idxInRankTable <= 10 ? 'inlineBlock' : 'none' }}>Wow!</span> You scored {this.props.score}</h1>
                    <h3 className="mt30">You answered {rightAns || '0'} answeres right out of {allAns} questions <br />
                        {/* you did it in <GameTimer currTimeStamp={this.props.currTimeStamp} /> */}
                    </h3>
                    <StyleRoot>
                        {this.state.idxInRankTable && <div className="game-records-break mt30">
                            {score && <h2 style={idxInRankTable <= 10 && styles.tada || styles.null}>
                                <span className="top-ten-greet" style={{ display: idxInRankTable <= 10 ? 'block' : 'none' }}>
                                    Congratulations!</span> you are {getRankPlaceGood(this.state.idxInRankTable)} place in the "{quiz.title}" quiz! </h2>}
                        </div>}
                    </StyleRoot>

                    {players && < div className="online-game">
                    <h1>your and your friends score:</h1>
                    {players.map(player => <h2>{player.username}:{' '+player.score}</h2>)}
                    </div>}
                    <div className="mt30">
                        <RankTable bestPlayers={tenBestPlayers} />
                    </div>
                    <div className="endgame-actions mt30" >
                        <button onClick={this.props.getInitialState}>Play Again</button>
                        <button><Link to='/browse'> Back to Browse</Link></button>
                        {reviewForm}
                        {/* {!this.state.isReviewSent ? reviewForm : reviewFeedback} */}
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
