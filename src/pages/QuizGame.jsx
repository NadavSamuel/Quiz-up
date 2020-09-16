import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { QuizList } from '../cmps/QuizList'
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
        currQuestionIdx:0,
        answerFeedback:null
    }

    // componentDidMount() {
    //    this.loadQuestions();
    // }
    
    // loadQuizzes =()=>{
    //     const quizzes= quizService.query();
    //     this.setState({quizzes})
    // }
    answerQuestion = answerResult => {

        this.setState({answerFeedback:answerResult}, () => console.log(this.state.answerFeedback))
        setTimeout(() =>{

            this.setState({currQuestionIdx:this.state.currQuestionIdx+ 1,answerFeedback:null})
        },1500)
    }

    render() {
        const {questions}=  this.state
        let {currQuestionIdx} = this.state
        let currQuestion=questions[currQuestionIdx]
        // console.log("render -> quizzes", quizzes)
        
        if (!questions) return <div>Loading....</div>
        return (
            <main className="quiz-game-main">
                <div className = "curr-question"><h1>{currQuestion.txt}</h1></div>
        <div className="answer-feedback" style={!this.state.answerFeedback?{visibility: 'hidden'}:{visibility: 'visible'}}><h2>{this.state.answerFeedback ==='true'? 'Right!': 'Wrong!' }</h2></div>
                <AnswersList answerFeedback={this.state.answerFeedback} answerQuestion={this.answerQuestion}  answers={currQuestion.answers}/>

                

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