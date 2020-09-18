import { PeopleAltOutlined, PersonOutlineSharp } from '@material-ui/icons'
import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReviewsList } from '../cmps/ReviewsList'
import { quizService } from '../services/quizService'
import { RankTable } from '../cmps/RankTable'
import { utilService } from '../services/utilService'
export class _QuizDetails extends Component {

    state = {
        quiz: null
    }
    async componentDidMount() {
        const quiz = await quizService.getById(this.props.match.params.quizId)
        this.setState({ quiz })
    }


    getAvgRate = () => {
        const { quiz } = this.state
        const sum = quiz.reviews.reduce((acc, review) => {
            return acc + review.rate
        }, 0)
        return (sum / quiz.reviews.length).toFixed(1);
    }

    addPlayerCount = () => {
        // const { quiz } = this.state
        // const { loggedInUser } = this.props
        // if(loggedInUser) 
        //Check if he already played...
        //  userToAdd = { id: loggedInUser._id, score: 0, fullName: loggedInUser.username }
        // quiz.allTimesPlayers=[...quiz.allTimesPlayers,userToAdd]
    }

    render() {
        const { quiz } = this.state
        if (!quiz) return <div>Loading...</div>
        const quizLength = quiz.quests.length
        const playedTime = quiz.allTimesPlayers.length
        if (quiz.allTimesPlayers) var bestPlayers = utilService.getBestUsers(quiz);
        const avgRate = this.getAvgRate()
console.log('CURR QUIZ:',quiz);
        return (
            <section className="quiz-details-container ">
                <div className="quiz-details-head">
                    {/* <img className="quiz-img" src="https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" /> */}
                    {quiz.img && <img className="quiz-img" src={quiz.img} alt="" />}
                    {!quiz.img && <img className="quiz-img" src="https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" />}
                    <div className="rank-container">

                        <RankTable bestPlayers={bestPlayers} />

                    </div></div>
                <div className="quiz-details-body">
                    <div className="quiz-info">
                        <h1 className="title">{quiz.title} {<span className="quiz-length">{quizLength > 1 ? `${quizLength} Questions` : `${quizLength} Question`}</span>}</h1>
                        <span className="creator">Created by {quiz.createdBy.fullName}</span>

                        {avgRate > 0 && <h4>Rated {avgRate}({quiz.reviews.length})</h4>}

                        {quiz.allTimesPlayers.length > 0 && <h5 className="played-times">Played {playedTime > 1 ? `${playedTime} times` : `${playedTime} time`} </h5>}
                        {quiz.tags[0].length >= 1 && <div className="tags">
                            <span>About </span>
                            {quiz.tags.map((tag, idx) => {
                                return <span key={idx}> {tag} </span>
                            })}
                        </div>}

                    </div>
                    <div className="btns">
                        <Link to={`/game/${quiz._id}`}>  <Button onClick={this.addPlayerCount} endIcon={<PersonOutlineSharp />
                        } variant="contained" color="primary">Play Single </Button></Link>
                        <Button endIcon={<PeopleAltOutlined />
                        } disabled variant="contained" color="primary">Play Online </Button></div></div>
                <div className="review-stats">
                    <h2 className="reviews-title">Reviews for this quiz:</h2>
                    {<ReviewsList reviews={quiz.reviews} />}
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {

}
export const QuizDetails = connect(mapStateToProps, mapDispatchToProps)(_QuizDetails)