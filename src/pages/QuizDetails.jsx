import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReviewsList } from '../cmps/ReviewsList'
import { quizService } from '../services/quizService'
import { RankTable } from '../cmps/RankTable'
import { utilService } from '../services/utilService'
import { Loading } from '../cmps/Loading'

export class _QuizDetails extends Component {

    state = {
        quiz: null
    }
    async componentDidMount() {
        const quiz = await quizService.getById(this.props.match.params.quizId)
        this.setState({ quiz })
        window.scrollTo(0, 0)

    }
    getAvgRate = () => {
        const { quiz } = this.state
        const sum = quiz.reviews.reduce((acc, review) => {
            return acc + review.rate
        }, 0)
        return (sum / quiz.reviews.length).toFixed(1);
    }

    getDifficulity = () => {
        const { quiz } = this.state
        if (quiz.difficulity === 1) return 'Easy'
        else if (quiz.difficulity === 2) return 'Medium'
        else if (quiz.difficulity === 3) return 'Hard'
    }


    render() {
        const { quiz } = this.state
        if (!quiz) return <Loading />
        const quizLength = quiz.quests.length
        const playedTime = quiz.allTimesPlayers.length
        if (quiz.allTimesPlayers) var { tenBestPlayers } = utilService.getBestUsers(quiz);
        const avgRate = this.getAvgRate()
        console.log(quiz);
        return (
            <section className="quiz-details-container main-container">
                <div className="bg-container">
                    <img className="bg-img" src={quiz.img} alt="" />

                    <div className="quiz-details-head">
                        <div className="quiz-info">

                            <h1 className="title">{quiz.title} </h1>
                            <div className="mini-info">
                                <h5 className="creator">

                                    <span>   {this.getDifficulity()}, </span>
                                    <span>  By {quiz.createdBy.fullName} </span>
                                    {quiz.tags[0].length >= 1 && <span>{
                                        quiz.tags.map((tag, idx) => {
                                            return <span key={idx}> {tag} </span>
                                        })
                                    }</span>}

                                </h5>
                                {avgRate > 0 && <h5>Rated {avgRate}({quiz.reviews.length}),{quiz.allTimesPlayers.length > 0 && <span>  Played {playedTime > 1 ? `${playedTime} times` : `${playedTime} time`}     </span>}             </h5>}
                                {<h5 className="quiz-length">{quizLength > 1 ? `${quizLength} Questions` : `${quizLength} Question`}</h5>}
                            </div>
                            <Link to={`/edit/${quiz._id}`}><button>Edit</button></Link>

                        </div>
                        <div className="rank-container">

                            <RankTable bestPlayers={tenBestPlayers} />

                        </div></div>
                    <div className="quiz-details-body">

                        <div className="btns">
                            <Link className="play-single-btn" to={`/game/${quiz._id}`}>  <button >Play Single </button></Link>
                            <Link className="play-single-btn" to={`/game/${quiz._id}/online`}>  <button >Play Online </button></Link>
                        </div></div>
                </div>
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

export const QuizDetails = connect(mapStateToProps)(_QuizDetails)