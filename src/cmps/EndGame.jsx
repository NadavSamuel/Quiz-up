import React, { Component } from 'react'
import { RankTable } from '../cmps/RankTable'
import { quizService } from '../services/quizService'
import { GameTimer } from '../cmps/GameTimer'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';


export class EndGame extends Component {
    state = {
        review: {
            by: {
                fullName: "user2",
                imgUrl: "/img/img2.jpg",
                _id: "u102"
            },
            txt: '',
            rate:2,
            id:123321

        }
        , isReviewSent: false
    }
    componentDidMount(){
        console.log('currQuiz in EndGame: ',this.props.quiz)
        this.updateAllTimePlayers()
    }
    handleReviewChange = ({ target }) => {
        const { name, value } = target
        this.setState({ ...this.state, review: { ...this.state.review, txt: value } })
    }
    updateAllTimePlayers = ()=>{
        const currQuiz = this.props.quiz
        const currUserMiniObject = {
            fullName: "user2",
            id: "u102",
            score:this.props.rightAns
        }
        currQuiz.allTimesPlayers.unshift(currUserMiniObject)
        quizService.update(currQuiz)
    }
    onSubmitReview = ev => {
        ev.preventDefault()
        const currQuiz = this.props.quiz
        currQuiz.reviews.unshift(this.state.review)
        quizService.update(currQuiz)

        this.setState({ isReviewSent: true })
    }
    changeRate = num =>{
        this.setState({review:{...this.state.review,rate:num}})
        // this.setState(...this.state,review:{...this.state.review,rate:num})
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
                     <StarBorderIcon onClick={() => { this.changeRate(this.state.review.rate + idx + 1) }}/>
                    {/* <i onClick={() => { this.changeRate(this.state.rate + idx + 1) }} className="far fa-star"></i> */}
                </div>
            )}
        </div>
    }

    render() {
        const { rightAns, allAns, category, allTimesPlayers } = this.props
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
        return (
            <main className="endgame-main" >
                <div className="endgame-top"> <h1>Wow! you scored {rightAns} out of {allAns} right!<br /> you did it in <GameTimer currTimeStamp={this.props.currTimeStamp} /></h1>
                    <RankTable bestPlayers={allTimesPlayers} />
                </div>
                <div className="game-records-break"> <h2>Congratulations! you are 3rd place in Israel in the {category} category! </h2>
                    <h2>Congratulations! you Broke your best score by 30 points! your new best score is 210</h2>
                </div>
                <div className="endgame-actions">
                    <button>Play again</button>
                    <button>back to browse</button>
                    {!this.state.isReviewSent ? reviewForm : reviewFeedback}
                    <button>somthing</button>
                </div>
                {/* <img src="https://newcanaanlibrary.org/wp-content/uploads/2017/05/Fireworks-GIF.gif"></img> */}
            </main>
        )
    }
}
