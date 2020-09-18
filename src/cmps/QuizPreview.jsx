
import React, { Component } from 'react';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom'
import { quizService } from '../services/quizService';
export class QuizPreview extends Component {
    state = {
        quiz: null
    }
    async componentDidMount() {
        const quiz = await quizService.getById(this.props.quizId)
        this.setState({ quiz })
    }
    getRate = () => {
        const sum = this.state.quiz.reviews.reduce((acc, review) => {
            return acc + review.rate
        }, 0)

        return (sum / this.state.quiz.reviews.length).toFixed(2);
    }
    getNumOfReviews = () => {
        return this.state.quiz.reviews.length
    }


    render() {
        const { quiz } = this.state
        if (!quiz) return <div>Loading..</div>
        return (
            <Link to={`/quiz/${quiz._id}`}>
            <div className="quiz-preview">
                <img className="main-img" src={quiz.img} alt="img" />
                <div className="info">
                    <h3>{quiz.title}</h3>
                    <p>
                        <span>{quiz.quests.length} Questions</span>
                        <span className='num-of-players'> {quiz.allTimesPlayers.length} played</span>
                    </p>
                    <div className="flex stars">
                        ({this.getNumOfReviews()}){this.getRate()}<StarIcon />
                    </div>
                </div>
            </div>
            </Link>
        );
    }
}

