// import {httpService} from './httpService'

const gUsers = [
    {
        "_id": "asdasas32434234",
        "profileImg": "https://image.freepik.com/free-vector/quiz-logo_2728-12.jpg",
        "password": "1234",
        "username": "tal",
        "isAdmin": false,
        "quizzes": [
            {
                "quizId": "1",
                "topic": "History of bla bla",
                "img": "/bamia.jpg"
            }
        ],
        "friends": [
            {
                "_id": "u105",
                "fullName": "Bob",
                "imgUrl": "http://some-img"
            },
            {
                "_id": "u106",
                "fullName": "yarom",
                "imgUrl": "http://some-img"
            }
        ]
    },
    {
        "_id": "asdasas32434234",
        "profileImg": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
        "password": "admin",
        "username": "admin",
        "isAdmin": true,
        "quizzes": [
            {
                "quizId": "q101",
            },
            {
                "quizId": "q102",
            },
            {
                "quizId": "q103",
            },

            {
                "quizId": "q105",
            },
            {
                "quizId": "q106",
            },
        ],
        "friends": [
            {
                "_id": "u105",
                "fullName": "Bob",
                "imgUrl": "http://some-img"
            },
            {
                "_id": "u106",
                "fullName": "yarom",
                "imgUrl": "http://some-img"
            }
        ]
    }
]


export const userService = {
    login,
    // logout,
    // signup,
    // getUsers,
    // getById,
    // remove,
    // update
}

function login({ username, password }) {
    const userToLog = gUsers.find(user => user.username === username && user.password === password)
    return Promise.resolve(_handleLogin(userToLog))
}

// async function loginAsync(credentials) {
//     const user = await httpService.post('auth/login', credentials)
//     return _handleLogin(user)
// }
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}