// import {httpService} from './httpService'

const gUsers=[
    {
        "_id": "asdasas32434234",
        "profileImg": "https://image.freepik.com/free-vector/quiz-logo_2728-12.jpg",
        "password": "1234",
        "username": "tal",
        "isAdmin":false,
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
        "profileImg": "https://image.freepik.com/free-vector/quiz-logo_2728-12.jpg",
        "password": "admin",
        "username": "admin",
        "isAdmin":true,
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

function login(credentials){
    console.log('credentials:',credentials);
}

// async function loginAsync(credentials) {
//     const user = await httpService.post('auth/login', credentials)
//     return _handleLogin(user)
// }
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}