import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { QuizList } from '../cmps/QuizList'
import { GameOn } from '../cmps/GameOn'
import { EndGame } from '../cmps/EndGame'
import { quizService } from '../services/quizService'
import { AnswersList } from '../cmps/AnswersList.jsx'

class _QuizGame extends Component {
    state={
        questions:[
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",

                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": "true",
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": "false",
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": "false",
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": "false",
                        "count": 5
                    },
                    
                ],
                
            },{
                "id": "bkjbk1434324",
                "txt": "is true?",

                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "true",
                        "isCorrect": "true",
                        "count": 7
                    },
                    {
                        "txt": "false",
                        "isCorrect": "false",
                        "count": 14
                    },
                    
                    
                ],
                
            }
            


        ],
        gameOn:true,
        rightAns:0
    }

    // componentDidMount() {
    //    this.loadQuestions();
    // }
    
    // loadQuizzes =()=>{
    //     const quizzes= quizService.query();
    //     this.setState({quizzes})
    // }
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
        // debugger
         this.setState({gameOn:false})
    }

    render() {
        const {questions}=  this.state
        let {currQuestionIdx} = this.state
        let currQuestion=questions[currQuestionIdx]
        // console.log("render -> quizzes", quizzes)
        
        if (!questions) return <div>Loading....</div>
        return (
            <main>
                {this.state.gameOn ? <GameOn onTrueAns={this.onTrueAns}  questions = {this.state.questions} onEndGame={this.onEndGame}/>:<EndGame/>}


                

                {/* <QuizList quizzes={ quizzes } /> */}
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