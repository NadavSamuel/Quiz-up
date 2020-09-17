import React from 'react'
import { QuestPreview } from './QuestPreview'

export function QuestList({ quests }) {
    return (
        <ul className="quest-list">
            {
                
                
                quests.map(quest =><li key={ quest.id }><QuestPreview quest={quest} /></li>)
            }
        </ul>
    )
}
