import React from 'react'

export function EndGame({ rightAns, allAns, category = 'history' }) {
    return (
        <main className="endgame-main" >
            <h1>Wow! you finished the game</h1>
            <h2>you scored {rightAns} out of {allAns} right!</h2>
            <h2>Congratulations! you are 3rd place in Israel in the {category} category! </h2>
            <h2>Congratulations! you Broke your best score by 30 points! your new best score is 210</h2>
            {/* <img src="https://newcanaanlibrary.org/wp-content/uploads/2017/05/Fireworks-GIF.gif"></img> */}
        </main>
    )
}
