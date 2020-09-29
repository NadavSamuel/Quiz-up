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
        }
        if(this.diffTime()<=-1) return
        this.setState({ now: Date.now() });
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
             <StyleRoot>
                <h1 style={styles.fadeInDown} className='game-countdown-time center-abs' >{this.timeToShow()}</h1>
                </StyleRoot>
            </div>

        )
    }
}