import React from 'react'

export function QuestPreview({ quest,onDeleteQuest }) {


    return (

        <div className="quest-preview">
            <h2>{quest.txt}</h2>
            <ul>
                {
                    quest.answers.map((answer, idx) =>
                        <li key={idx}>{answer.txt}</li>
                    )
                }
            </ul>
            <button onClick={()=>onDeleteQuest(quest.id)}>delete</button>
        </div>

    )
}
