import { Link } from '@material-ui/core'
import React, { Component } from 'react'
import { QuizPreview } from './QuizPreview'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export function QuizListFull({ quizzes }) {

    return (
        <ul className="list">
            {quizzes && quizzes.map(quiz => <li key={quiz._id}><QuizPreview key={quiz._id} quizId={quiz._id} /></li>)}
        </ul>
    )
}

