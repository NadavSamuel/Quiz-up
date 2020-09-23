import React from 'react'

export function RankTable({ bestPlayers }) {
    return (
        <div className="rank-table">
            <div className="header">
                <span className="score">Top Players</span>
            </div>
            {bestPlayers && bestPlayers.length >= 1 && bestPlayers.map((player, idx) => {
                return <p className="table-line" key={idx}>
                    <span className="table-position">#{idx + 1} - </span>
                    <span className="table-name">{player.fullName}</span>
                    <span className="table-score"> Scored {player.score}</span>
                </p>
            })}
            {!bestPlayers.length && <p className="table-line" >
                <span className="table-position"></span>
                <span className="table-name">No one played this game</span>
                <span className="table-score"></span>
            </p>}

        </div>
    )
}
