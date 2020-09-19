import { Link } from '@material-ui/core'
import React, { Component } from 'react'
import { QuizPreview } from './QuizPreview'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export class QuizList extends Component {

    state = {
        quizzes: [],
        num: 0
    }

    componentDidMount() {
        this.setState({ quizzes: this.props.quizzes })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.quizzes.length !== this.props.quizzes.length) this.setState({ quizzes: this.props.quizzes })
    }



    getQuizzesToPrev = () => {
        const quizzes = this.state.quizzes
        if (quizzes.length < 3) return quizzes
        const num = this.state.num % quizzes.length
        var res = quizzes.length - num
        if (res >= 3) return quizzes.slice(num, num + 3)
        if (res === 2) return [...(quizzes.slice(num, num + 2)), quizzes[0]]
        if (res === 1) return [quizzes[num], ...quizzes.slice(0, 2)]
        if (res === 0) return quizzes.slice(0, 3)
    }

    next = () => {
        this.setState({ num: this.state.num + 3 })
    }

    prev = () => {
        if (this.state.num >= 3) this.setState({ num: this.state.num - 3 })
        else if (this.state.num < 3) this.setState({ num: this.state.quizzes.length - (3 - this.state.num) })
    }

    render() {


        return (
            <div className="quiz-list flex align-center justify-between">

                { <ArrowLeftIcon onClick={() => this.prev()} />}
                <div className="list">
                    {

                        this.getQuizzesToPrev() && this.getQuizzesToPrev().map(quiz => <QuizPreview key={quiz._id} quizId={quiz._id} />)
                    }
                </div>
                {<ArrowRightIcon onClick={() => this.next()} />}
            </div>
        )
    }
}
