import { Link } from '@material-ui/core'
import React, { Component } from 'react'
import { QuizPreview } from './QuizPreview'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export function BlackPage({isShown,closeMenu}) {

    


    return (
        <div onClick={()=>closeMenu()} className={(isShown)?'black-page':''}></div>
    )
}

