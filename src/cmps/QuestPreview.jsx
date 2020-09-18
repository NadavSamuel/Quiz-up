import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


export function QuestPreview({ quest, onDeleteQuest, onUpdateQuest }) {
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
            <div className="quest-preview-btn">
                <DeleteIcon onClick={() => onDeleteQuest(quest.id)} />
                <EditIcon onClick={() => onUpdateQuest(quest)} />
            </div>
        </div>

    )
}
