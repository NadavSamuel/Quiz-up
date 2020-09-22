import { PeopleAltOutlined, PersonOutlineSharp } from '@material-ui/icons'
import React, { Component } from 'react'
import { Button } from '@material-ui/core'
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

    addPlayerCount = () => {
        // const { quiz } = this.state
        // const { loggedInUser } = this.props
        // if(loggedInUser) 
        //Check if he already played...
        //  userToAdd = { id: loggedInUser._id, score: 0, fullName: loggedInUser.username }
        // quiz.allTimesPlayers=[...quiz.allTimesPlayers,userToAdd]
    }
    getDifficulity = () => {
        const { quiz } = this.state
        if (quiz.difficulity === 1) return 'Easy'
        else if (quiz.difficulity === 2) return 'Medium'
        else if (quiz.difficulity === 3) return 'Hard'
    }
    render() {
        const { quiz } = this.state
        if (!quiz) return <Loading/>

        const quizLength = quiz.quests.length
        const playedTime = quiz.allTimesPlayers.length
        if (quiz.allTimesPlayers) var { tenBestPlayers } = utilService.getBestUsers(quiz);
        const avgRate = this.getAvgRate()
        return (
            <section className="quiz-details-container ">
                <Link to={`/edit/${quiz._id}`}><Button variant="contained" color="primary">Edit</Button></Link>
                <div className="quiz-details-head">
                    {/* <img className="quiz-img" src="https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" /> */}
                    {quiz.img && <img className="quiz-img" src={quiz.img} alt="" />}
                    {!quiz.img && <img className="quiz-img" src="https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" />}
                    <div className="rank-container">

                        <RankTable bestPlayers={tenBestPlayers} />

                    </div></div>
                <div className="quiz-details-body">
                    <div className="quiz-info">
                        <h1 className="title">{quiz.title} </h1>

                        <h5 className="creator">

                            {this.getDifficulity()} -
                            By {quiz.createdBy.fullName} -
                            {quiz.tags[0].length >= 1 && <span>{
                                quiz.tags.map((tag, idx) => {
                                    return <span key={idx}> {tag} </span>
                                })
                            }</span>}

                        </h5>

                        {avgRate > 0 && <h5>Rated {avgRate}({quiz.reviews.length}) ,{quiz.allTimesPlayers.length > 0 && <span>  Played {playedTime > 1 ? `${playedTime} times` : `${playedTime} time`}     </span>}             </h5>}
                        {<h5 className="quiz-length">{quizLength > 1 ? `${quizLength} Questions` : `${quizLength} Question`}</h5>}


                    </div>
                    <div className="btns">
                        <Link className="play-single-btn" to={`/game/${quiz._id}`}>  <Button onClick={this.addPlayerCount} endIcon={<PersonOutlineSharp />
                        } variant="contained" color="primary">Play Single </Button></Link>
                        {/* <Button endIcon={<PeopleAltOutlined />
                        } disabled variant="contained" color="primary">Play Online </Button> */}
                    </div></div>
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