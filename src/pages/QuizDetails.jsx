import { PeopleAltOutlined, PersonOutlineSharp } from '@material-ui/icons'
import React, { Component } from 'react'
// import {PersonSharpIcon } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReviewsList } from '../cmps/ReviewsList'
import { quizService } from '../services/quizService'
export class _QuizDetails extends Component {

    state = {
        quiz: null
    }
    componentDidMount() {
        const quiz = quizService.getById(this.props.match.params.quizId)
        this.setState({ quiz })
    }

    getBestUsers = () => {
        const { quiz } = this.state
        var bestPlayers = [...quiz.allTimesPlayers];
        bestPlayers.sort((player1, player2) => {
            return (player2.score - player1.score)
        })
        return bestPlayers.slice(0, 10);
    }
    getAvgRate = () => {
        const { quiz } = this.state
        const sum = quiz.reviews.reduce((acc, review) => {
            return acc + review.rate
        }, 0)

        return (sum / quiz.reviews.length).toFixed(1);
    }



    render() {
        const { quiz } = this.state
        if (!quiz) return <div>Loading...</div>
        const quizLength = quiz.quests.length

        console.log(quiz);
        const bestPlayers = this.getBestUsers();
        this.getBestUsers()

        return (
            <section className="quiz-details-container ">
                <div className="quiz-details-head">
                    <img className="quiz-img" src="https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" />
                    {/* {quiz.img && <img src={quiz.img} alt="" />}
                {!quiz.img && <img src="https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" />} */}
                    <div className="rank-container">


                        {bestPlayers.length > 1 && <div className="rank-table">
                            <div className="header">
                                <span className="position">#</span>
                                <span className="name">Name</span>
                                <span className="score">Score</span>
                            </div>
                            {bestPlayers.map((player, idx) => {
                                return <p className="table-line" key={player.id}>
                                    <span className="table-position">#{idx + 1} - </span>
                                    <span className="table-name">{player.fullName}</span>
                                    <span className="table-score"> Scored {player.score}</span>
                                </p>
                            })}

                        </div>}

                    </div></div>
                <div className="quiz-details-body">
                    <div className="quiz-info">
                        <h1 className="title">{quiz.title} {<span className="quiz-length">{quizLength > 1 ? `${quizLength} Questions` : `${quizLength} Question`}</span>}</h1>
                        <h4>Rated {this.getAvgRate()}</h4>

                        <h5 className="creator">Created by {quiz.createdBy.fullName}</h5>
                        <div className="tags">
                            {/* {quiz.tags.map((tag, idx) => {
                                return <span key={idx}>{tag} </span>
                            })} */}
                        </div>

                    </div>
                    <div className="btns">
                        <Link to={`/game/${quiz._id}`}>  <Button endIcon={<PersonOutlineSharp />
                        } variant="contained" color="primary">Single Player</Button></Link>
                        <Button endIcon={<PeopleAltOutlined />
                        } disabled variant="contained" color="primary">Multi Player</Button></div></div>
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