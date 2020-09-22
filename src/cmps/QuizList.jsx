import React, { Component } from 'react'
import { QuizPreview } from './QuizPreview'
import { Link } from 'react-router-dom'


export class QuizList extends Component {

    state = {
        quizzes: [],
    }

    componentDidMount() {
        this.setState({ quizzes: this.props.quizzes })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.quizzes.length !== this.props.quizzes.length) this.setState({ quizzes: this.props.quizzes })
    }

    render() {


        return (
            <div className="quiz-list">


                <div className="list">
                    {
                        this.state.quizzes && this.state.quizzes.map(quiz => <QuizPreview key={quiz._id} quizId={quiz._id} />)
                    }
                </div>
                <Link to={`/list/all/${this.props.sort}`}>
                <h3>Get more...</h3>
                </Link>
            </div>
        )
    }
}
