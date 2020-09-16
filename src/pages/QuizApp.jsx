import React, { Component } from 'react'
import { connect } from 'react-redux'
import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'

class _QuizApp extends Component {

    state={
        quizzes:[]
    }

    componentDidMount() {
       this.loadQuizzes();
    }
    
    loadQuizzes =()=>{
        const quizzes= quizService.query();
        this.setState({quizzes})
    }

    render() {
        const quizzes=  this.state.quizzes
        console.log("render -> quizzes", quizzes)
        
        if (!quizzes) return <div>Loading....</div>
        return (
            <div className="quiz-app">
                <QuizList quizzes={ quizzes } />
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
export const QuizApp = connect(mapStateToProps, mapDispatchToProps)(_QuizApp)