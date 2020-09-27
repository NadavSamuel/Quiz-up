import React from 'react'

export default function About() {
    return (
        <React.Fragment>
            <div className="quizup-story">
                <h1>The Story</h1>
                <p>
                    "Quiz-Up" was founded in 2020 as part of the final project of the "Coding-Academy" course.
                    The main use of the app is to give the option to create questionnaires, play together or separately, send and play with friends.
                    With the app you can store and share knowledge and pass the time with friends!
                </p>
            </div>
            <div className="technologies">
                The "Quiz-Up" application was built as a Single Page Application in front with ES6, ReactJS, with Redux State Management and designed with SCSS.
                We work with external APIs such as Unpslash API, OpenDB API.
                We developed the Backend with NodeJS REST API. And everything is stored on the MongoDB database.
            </div>
            <div className="creators">
                <div className="tal"></div>
                <div className="or"></div>
                <div className="nadav"></div>
            </div>
            <div className="thanks"></div>
        </React.Fragment>


    )
}
