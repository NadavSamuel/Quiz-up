import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { QuizList } from '../cmps/QuizList'
import { GameOn } from '../cmps/GameOn'
import { EndGame } from '../cmps/EndGame'
import { quizService } from '../services/quizService'
import { utilService } from '../services/utilService'
import { AnswersList } from '../cmps/AnswersList.jsx'

class _QuizGame extends Component {
    state={
        quiz:{},
        gameOn:true,
        rightAns:0,
        currTimeStamp:0
    }

    componentDidMount() {
       this.loadQuizz();
       const timer = setInterval(() =>{
           this.updateTime()
           if(!this.state.gameOn) clearInterval(timer)
       },1000)
    }

     loadQuizz = async ()=>{
        const quiz = await quizService.getById(this.props.match.params.quizId)
        quiz.quests.forEach(quest =>{
            utilService.shuffleAnswers(quest.answers)
        })
        this.setState({ quiz },() => console.log('all time players: ', this.state.quiz.allTimesPlayers))
    }
    onTrueAns = () =>{
        this.setState({rightAns:this.state.rightAns+1})
            }
    answerQuestion = answerResult => {

        this.setState({answerFeedback:answerResult}, () => console.log(this.state.answerFeedback))
        setTimeout(() =>{

            this.setState({currQuestionIdx:this.state.currQuestionIdx+ 1,answerFeedback:null})
        },1500)
    }
    onEndGame = () =>{
         this.setState({gameOn:false})
    }


    /////////////////////// Timer funcs
    updateTime = () => {
        if(this.state.gameOn) this.setState({ currTimeStamp: this.state.currTimeStamp + 1000 })
        return true
    }
    ///////////////////////

    render() {
        console.log('currQuiz: ',this.state.quiz)
        const questions=  this.state.quiz.quests
        let {currQuestionIdx} = this.state
        // console.log("render -> quizzes", quizzes)
        
        if (!questions) return <div>Loading....</div>
        return (
            <main>
                {this.state.gameOn ? <GameOn currTimeStamp={this.state.currTimeStamp} onTrueAns={this.onTrueAns}  questions = {questions} onEndGame={this.onEndGame}/>:
                <EndGame quiz = {this.state.quiz} currTimeStamp={this.state.currTimeStamp} allTimesPlayers={this.state.quiz.allTimesPlayers}category={this.state.quiz.tags[0]} rightAns={this.state.rightAns} allAns={this.state.quiz.quests.length}/>}
            </main>
        )
    }
}
const mapStateToProps = state => {
    return {
      
    }
}
const mapDispatchToProps = {
    
}
export const QuizGame = connect(mapStateToProps, mapDispatchToProps)(_QuizGame)