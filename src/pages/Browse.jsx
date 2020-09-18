import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'

class _Browse extends Component {

    state = {
        quizzes: [],
        tagCount: 0
    }

    getTags= ()=>{
        const tags = this.state.quizzes.reduce((acc,quiz)=>{
            let tags=quiz.tags
            tags.forEach(tag => {
                if( !acc.includes(tag))acc.push(tag)
            });
            return acc
        },[])
        console.log(tags);
    }

    componentDidMount() {
       
        this.loadQuizzes();
    }

    getQuizzesToPrev = () => {
        const quizzes = this.state.quizzes
        if (quizzes.length < 3) return quizzes
        const num = this.state.tagCount % quizzes.length
        var res = quizzes.length - num
        if (res >= 3) return quizzes.slice(num, num + 3)
        if (res === 2) return [...(quizzes.slice(num, num + 2)), quizzes[0]]
        if (res === 1) return [quizzes[num], ...quizzes.slice(0, 2)]
        if (res === 0) return quizzes.slice(0, 3)


    }

    next = () => {
        this.setState({ tagCount: this.state.tagCount + 3 })
    }

    prev = () => {
        if (this.state.tagCount >= 3) this.setState({ tagCount: this.state.tagCount - 3 })
        else if (this.state.tagCount < 3) this.setState({ tagCount: this.state.quizzes.length - (3 - this.state.tagCount) })
    }

    loadQuizzes = async () => {
        const quizzes = await quizService.query();
        this.setState({ quizzes },()=>this.getTags())
    }

    render() {
        const quizzes = this.state.quizzes
        if (!quizzes) return <div>Loading....</div>
        return (
            <div className="home-page full">
                <div className="main-container">

                    <h3>tag1:</h3>
                    <QuizList next={this.next} prev={this.prev} quizzes={this.getQuizzesToPrev()} />
                    <h3>tag2:</h3>
                    <QuizList next={this.next} prev={this.prev} quizzes={this.getQuizzesToPrev()} />
                    <h3>tag3:</h3>
                    <QuizList next={this.next} prev={this.prev} quizzes={this.getQuizzesToPrev()} />
                </div>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {

}
export const Browse = connect(mapStateToProps, mapDispatchToProps)(_Browse)