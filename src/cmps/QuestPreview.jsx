import React from 'react'

export function QuestPreview({ quest }) {


    return (

        <div className="quest-preview">
            <h2>{quest.txt}</h2>
            <ul>
                {
                    quest.answers.map((answer, idx) =>
                        <li>{answer.txt}</li>
                    )
                }
            </ul>
        </div>

    )
}
