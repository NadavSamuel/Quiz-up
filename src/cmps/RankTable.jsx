import React from 'react'
export function RankTable({ bestPlayers }) {
    if (!bestPlayers.length) return <div></div>
    if (bestPlayers[0].username) bestPlayers = bestPlayers.sort((player1, player2) => {
        return (player2.score - player1.score)
    })

    return (
        <div className="rank-table">
            <div className="header">
                <span className="score">{bestPlayers[0].fullName ? 'All Time Top-Players' : 'Online Top-Players'}</span>
            </div>
            {bestPlayers && bestPlayers.length >= 1 && bestPlayers.map((player, idx) => {
                return <p className="table-line" key={idx}>
                    <span className="table-position">#{idx + 1}</span>
                    <span className="table-name">{player.fullName ? player.fullName : player.username}</span>
                    <span className="table-score"> {player.score}</span>
                </p>
            })}
            {!bestPlayers.length && <p className="table-line" >
                <span className="table-position"></span>
                <span className="table-name">No ranks for this game.</span>
                <span className="table-score"></span>
            </p>}

        </div>
    )
}
