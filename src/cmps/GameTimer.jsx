
import React  from 'react'
import { utilService } from '../services/utilService'

export function GameTimer(props) {
    function getTimer() {
        let { currTimeStamp } = props
        const editedTime = timestampToTime(currTimeStamp)
        return editedTime
    }


    function timestampToTime(timeStamp) {
        return utilService.getTime(timeStamp)
    }
    return (
        <React.Fragment>
            {getTimer()}
        </React.Fragment>
        // <div className="main-timer-container">
        //     <h2 >{getTimer()} </h2>

        // </div>
    )
}
