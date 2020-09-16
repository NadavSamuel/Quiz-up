import axios from 'axios'
const BASE_URL = 'http://localhost:3001/quiz'

const resolveData = res => res.data

export const quizService = {
    query,
    getById,
    remove,
    save
}

function query(filterBy = {}) {
    var queryParams = new URLSearchParams()
    if (filterBy.vendor) queryParams.set('q', filterBy.vendor)
    return axios.get(`${BASE_URL}?${queryParams}`)
        .then(resolveData)
}

function getById(quizId) {
    return axios.get(`${BASE_URL}/${quizId}`)
        .then(resolveData)

}

function remove(quizId) {
    return axios.delete(`${BASE_URL}/${quizId}`)
}

function save(quiz) {
    if (quiz._id) {
        return axios.put(`${BASE_URL}/${quiz._id}`, quiz)
    } else {
        return axios.post(BASE_URL, quiz).then(resolveData)
    }
}
