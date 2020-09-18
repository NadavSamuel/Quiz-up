import React, { Component } from 'react'
import { RankTable } from '../cmps/RankTable'

// export class _LoginSignup extends Component {
//     state = {
//         username: '',
//         password: ''
//     }

export class EndGame extends Component {
    //({ rightAns, allAns, category, allTimesPlayers }) 
    state = {
        review: {
            txt: ''
        }
        , isReviewSent: false
    }
    handleReviewChange = ({ target }) => {
        const { name, value } = target
        this.setState({ ...this.state, review: { ...this.state.review, txt: value } })

    }
    onSubmitReview = ev =>{
        ev.preventDefault()
        this.setState({isReviewSent:true})
    }
    render() {
        const { rightAns, allAns, category, allTimesPlayers } = this.props
        const reviewForm =  <form onSubmit ={this.onSubmitReview}>
        <label htmlFor="review">Review this quiz:</label>

        <textarea onChange={this.handleReviewChange} value={this.state.review.txt} placeholder="your review here" id="review" name="review" rows="4" cols="50">
        </textarea>
        <button>sendReview</button>
    </form>
    const reviewFeedback = <div>
        <p>Thank you for writing a review! </p>
    </div>
        return (
            <main className="endgame-main" >
                <div className="endgame-top"> <h1>Wow! you scored {rightAns} out of {allAns} right!</h1>
                    <RankTable bestPlayers={allTimesPlayers} />
                </div>
                <div className="game-records-break"> <h2>Congratulations! you are 3rd place in Israel in the {category} category! </h2>
                    <h2>Congratulations! you Broke your best score by 30 points! your new best score is 210</h2>
                </div>
                <div className="endgame-actions">
                    <button>Play again</button>
                    <button>back to browse</button>
              {!this.state.isReviewSent? reviewForm:reviewFeedback}     
                    <button>somthing</button>
                </div>
                {/* <img src="https://newcanaanlibrary.org/wp-content/uploads/2017/05/Fireworks-GIF.gif"></img> */}
            </main>
        )
    }
}
