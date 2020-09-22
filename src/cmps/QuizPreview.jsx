
import React, { Component } from 'react';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom'
import { quizService } from '../services/quizService';
import { Loading } from './Loading';
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
        if (!quiz) return <Loading/>
        return (
            <Link to={`/quiz/${quiz._id}`}>
            <div className="quiz-preview">
                <img className="main-img" src={quiz.img} alt="img" />
                <div className="info">
                    <h3 className='quiz-title'>{quiz.title}</h3>
                    <p>
                        <span>{quiz.quests.length} Questions</span>
                        <span className='num-of-players'> {quiz.allTimesPlayers.length} played</span>
                    </p>
                    <div className='difficulity'>

                    {quiz.difficulity===1 && <h5 style={{color:'green'}}>Easy</h5>}
                    {quiz.difficulity===2 && <h5 style={{color:'#07689f'}}>Medium</h5>}
                    {quiz.difficulity===3 && <h5 style={{color:'red'}}>Hard</h5>}
                    </div>
                    {this.getNumOfReviews()>0 &&
                        <div className="flex stars">
                        ({this.getNumOfReviews()}){this.getRate()}<StarIcon />
                    </div>}
                </div>
            </div>
            </Link>
        );
    }
}

