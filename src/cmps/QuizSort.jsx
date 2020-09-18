import React from 'react'
import { Link } from 'react-router-dom'

export function QuizSort({setSortBy}) {
    return (
        <div>
            <button onClick={()=>{setSortBy('title')}}>title</button>
            <button onClick={()=>{setSortBy('difficulity')}}>difficulity</button>
            <button onClick={()=>{setSortBy('popularity')}}>popularity</button>
        </div>
        
    )
}