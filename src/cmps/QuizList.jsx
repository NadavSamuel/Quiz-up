import { Link } from '@material-ui/core'
import React, { Component } from 'react'
import { QuizPreview } from './QuizPreview'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export class QuizList extends Component {

    state = {
        quizzes: [],
        num: 0,
        numOfRow: 3
    }

    componentDidMount() {
        if (window.innerWidth < 710 && window.innerWidth>500) {
            console.log("QuizList -> componentDidMount -> this.props.windowWidth", window.innerWidth)

            this.setState({ numOfRow: 4 })
        }
        this.setState({ quizzes: this.props.quizzes })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.quizzes.length !== this.props.quizzes.length) this.setState({ quizzes: this.props.quizzes })
    }



    getQuizzesToPrev = () => {
        const row = this.state.numOfRow
        console.log("QuizList -> getQuizzesToPrev -> row", row)
        
        const quizzes = this.state.quizzes
        if (quizzes.length < row) return quizzes
        const num = this.state.num % quizzes.length
        var res = quizzes.length - num
        if (res >= row) return quizzes.slice(num, num + row)
        else return [...quizzes.slice(num, num + res), ...quizzes.slice(0, row - res)]
        // if(row===3){
        //     if (res === 2) return [...(quizzes.slice(num, num + 2)), quizzes[0]]
        //     if (res === 1) return [quizzes[num], ...quizzes.slice(0, 2)]
        //     if (res === 0) return quizzes.slice(0, 3)
        // }else{
        //     if (res >= 4) return quizzes.slice(num, num + this.state.numOfRow)
        // if (res === 3) return [...(quizzes.slice(num, num + 3)), quizzes[0]]
        // if (res === 2) return [...(quizzes.slice(num, num + 2)), quizzes[0]]
        // if (res === 1) return [quizzes[num], ...quizzes.slice(0, 2)]
        // if (res === 0) return quizzes.slice(0, 3)

    }

    next = () => {
        this.setState({ num: this.state.num + 3 })
    }

    prev = () => {
        const row= this.state.numOfRow
        if (this.state.num >= row) this.setState({ num: this.state.num - row })
        else  this.setState({ num: this.state.quizzes.length - (row - this.state.num) })

        // if (this.state.num >= row) this.setState({ num: this.state.num - row })
        // else if (this.state.num < row) this.setState({ num: this.state.quizzes.length - (row - this.state.num) })
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
