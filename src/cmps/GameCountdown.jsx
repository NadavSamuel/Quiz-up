import React, { Component } from 'react'
import { fadeInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

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
        var seconds = Math.floor(diffTime % (60 * 1000) / 1000);
        return seconds
    }

    timeToShow = () => {
        var diffTime = this.diffTime();
        diffTime = (diffTime >= 10) ? diffTime + '' : '0' + diffTime
        return diffTime;
    }

    interval = () => {
        this.timerInterval = setInterval(this.updateTime, 1000);
    }

    updateTime = () => {
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
        const styles = {
            fadeInDown: {
                animation: 'x 1s',
                animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
            }
        }
        return (
            <div className='game-countdown'>
             {/* <React.Fregment> */}
             <StyleRoot>
                <h1 style={styles.fadeInDown} className='game-countdown-time' >{this.timeToShow()}</h1>
                </StyleRoot>
                {/* <Progress  value={this.timeToShow()} max={15}/> */}
                {/* </React.Fregment> */}
            </div>

        )
    }
}