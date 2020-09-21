import React, { Component } from 'react'
import { Answer } from '../cmps/answer.jsx'
import { QuizList } from './QuizList.jsx'
import { quizService } from '../services/quizService'
import { imgService } from '../services/imgService'
import { Link } from 'react-router-dom'


export class Timer extends Component {

    state = {
        now: Date.now(),
        countDown: Date.now()+(1000*15)  
    }
    timerInterval=null;

    componentDidMount() {
        this.interval();
    }

    componentWillUnmount(){
        clearInterval(this.timerInterval);
    }

    diffTime= ()=>{
        var currTime=Date.now();
        var diffTime=this.state.countDown-currTime;
        var seconds= Math.floor(diffTime%(60*1000)/1000);
        return seconds
    }

    timeToShow= ()=>{
        var diffTime= this.diffTime();
        diffTime=(diffTime>=10)? diffTime+'': '0'+diffTime
        return diffTime;
    }

    interval = () => {
        this.timerInterval = setInterval(this.updateTime, 100);
    }

    updateTime = () => {
        if(this.diffTime()===0){
            clearInterval(this.timerInterval);
            if(this.props.cb) this.props.cb();
            // this.playSound();
        }
        this.setState({ now: Date.now() });
    }

    playSound= ()=>{
        // this.sound.play();
    }

    
    


    render() {
        return (
            <div className='timer'>
               <h1 >{this.timeToShow()}</h1>
               <progress  value={''+((15-this.timeToShow())/15*100)} max="100"></progress>
               
            </div>

        )
    }
}