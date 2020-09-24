import React, { Component } from 'react'

export class GameCountdown extends Component {

    state = {
        now: Date.now(),
        countDown: Date.now() + (1000 * 3)
    }
    timerInterval = null;

    componentDidMount() {
        this.interval();
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    diffTime = () => {
        var currTime = Date.now();
        var diffTime = this.state.countDown - currTime;
        var seconds = Math.floor(diffTime % (60 * 1300) / 1000);
        return seconds
    }

    timeToShow = () => {
        var diffTime = this.diffTime();
        diffTime = (diffTime >= 10) ? diffTime + '' : '0' + diffTime
        return diffTime;
    }

    interval = () => {
        this.timerInterval = setInterval(this.updateTime, 1300);
    }

    updateTime = () => {
        // console.log(this.diffTime())
        if (this.diffTime() === -1) {
            clearInterval(this.timerInterval);
            this.props.onGameCountdownFinished();
            // this.playSound();
        }
        this.setState({ now: Date.now() });
    }

    playSound = () => {
        // this.sound.play();
    }





    render() {
        return (
            <div className='game-countdown'>
                {/* <React.Fregment> */}
                <h1 className='game-countdown-time' >{this.timeToShow()}</h1>
                {/* <Progress  value={this.timeToShow()} max={15}/> */}
                {/* </React.Fregment> */}
            </div>

        )
    }
}