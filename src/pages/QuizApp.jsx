import React, { Component } from 'react'
import { connect } from 'react-redux'
import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'

class _QuizApp extends Component {

    state={
        quizzes:[],
        tag1Count:0
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
        if (!quizzes) return <div>Loading....</div>
        return (
            <div className="quiz-app">
                <QuizList quizzes={ quizzes } />
            </div>
        )
    }

    getToyToPrev=()=>{
        const toys = this.props.toys
        if(toys.length<3) return toys
        const num =  this.state.num%toys.length
        console.log("getToyToPrev -> num", num)
        var res=toys.length-num
        console.log("getToyToPrev -> res", res)
        if (res>=3)  return toys.slice(num,num+3)
        if(res===2) return [...(toys.slice(num,num+2)),toys[0]]
        if(res===1) return [toys[num],...toys.slice(0,2)]
        if(res===0) return toys.slice(0,3)


    }

    next=()=>{
        this.setState({num:this.state.num+3})
    }

    prev=()=>{
        if(this.state.num>=3) this.setState({num:this.state.num-3})
        else if(this.state.num<3) this.setState({num:this.props.toys.length-(3-this.state.num)})
    }
}
const mapStateToProps = state => {
    return {
      
    }
}
const mapDispatchToProps = {
    
}
export const QuizApp = connect(mapStateToProps, mapDispatchToProps)(_QuizApp)