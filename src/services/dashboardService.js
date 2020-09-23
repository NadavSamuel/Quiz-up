import { utilService } from './utilService'


export const dashBoardService = {
    getTagsMap,
    flipMapToDonate,
    getDifficulityMap,
    getRatedMap,
}


function getTagsMap(quizzes) {
    const quizzesCopy = [...quizzes]
    return quizzesCopy.reduce((acc, quiz) => {
        quiz.tags.forEach(tag => {
            if (acc[tag]) acc[tag]++
            else acc[tag] = 1;

        });
        return acc
    }, {})
}

function getDifficulityMap(quizzes) {
    const quizzesCopy = [...quizzes]
    return quizzesCopy.reduce((acc, quiz) => {
        if (quiz.difficulity === 1) acc.Easy++;
        if (quiz.difficulity === 2) acc.Medium++;
        if (quiz.difficulity === 3) acc.Hard++;
        return acc
    }, { Easy: 0, Medium: 0, Hard: 0 })
}

function getRatedMap(quizzes) {
    const quizzesCopy = [...quizzes]
    return quizzesCopy.reduce((acc, quiz) => {
        let rate = utilService.getRate(quiz);
        if (rate === 0) acc['Not rated']++;
        else if (rate < 2) acc['1-2']++;
        else if (rate < 3) acc['2-3']++;
        else if (rate < 4) acc['3-4']++;
        else if (rate < 5) acc['4-5']++;

        return acc
    }, { 'Not rated': 0, '1-2': 0, '2-3': 0, '3-4': 0, '4-5': 0 })
}

function flipMapToDonate(map) {
    const keys = []
    for (const key in map) {
        keys.push(key)
    }
    var colors = keys.map(key => utilService.getRandomColor());
    var hoverColors = keys.map(key => utilService.getRandomColor());
    const data = {
        labels: keys,
        datasets: [{
            data: Object.values(map),
            backgroundColor: colors,
            hoverBackgroundColor: hoverColors
        }]
    }
    return data
}


