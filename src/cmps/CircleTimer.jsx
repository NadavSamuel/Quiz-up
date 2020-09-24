import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


export class CircleTimer extends Component {
  state = {
    isTimerOn: true
  }

  render() {
    const { ansSelected } = this.props

    return (
      <div className="App">

        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => [true, 1500]}
          >
            {/* {renderTime} */}
          </CountdownCircleTimer>
        </div>
        {/* <div className="button-wrapper">
          <button onClick={() => setKey(prevKey => prevKey + 1)}>
            Restart Timer
          </button>
        </div> */}
      </div>
    );
  }
}




