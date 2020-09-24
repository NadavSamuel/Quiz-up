import React from 'react'
import { QuestPreview } from './QuestPreview'

export function QuestList({ quests, onDeleteQuest, onUpdateQuest }) {
    return (
        <ul className="quest-list">
            {
                quests.map(quest => <li key={quest.id}><QuestPreview quest={quest} onUpdateQuest={onUpdateQuest} onDeleteQuest={onDeleteQuest} /></li>)
            }
        </ul>
    )
}
