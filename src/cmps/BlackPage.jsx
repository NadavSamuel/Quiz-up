import React, { Component } from 'react'

export function BlackPage({ isShown, closeMenu }) {




    return (
        <div onClick={() => closeMenu()} className={(isShown) ? 'black-page' : ''}></div>
    )
}

