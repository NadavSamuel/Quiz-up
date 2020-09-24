import React from 'react'

export function QuizSort({ setSortBy }) {
    return (
        <div>
            <button onClick={() => { setSortBy('title') }}>Title</button>
            <button onClick={() => { setSortBy('difficulity') }}>Difficulity</button>
            <button onClick={() => { setSortBy('popularity') }}>Popularity</button>
            <button onClick={() => { setSortBy('rate') }}>Rate</button>
        </div>

    )
}