// import {httpService} from './httpService'

var gUsers = [
    {
        "_id": "asdasas32434234",
        "profileImg": "https://image.freepik.com/free-vector/quiz-logo_2728-12.jpg",
        "password": "1234",
        "username": "tal",
        "isAdmin": false,
        "quizzes": [],
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
    logout,
    add,
    getCurrUser,
    updateUserQuizzes
    // getUsers,
    // getById,
    // remove,
    // update
}

function login({ username, password }) {
    const userToLog = gUsers.find(user => user.username === username && user.password === password)
    return Promise.resolve(_handleLogin(userToLog))
}

function logout() {
    // await httpService.post('auth/logout');
    sessionStorage.clear();

}
function getCurrUser() {
    // await httpService.post('auth/logout');
    let currUser = sessionStorage.getItem('user')
    currUser = JSON.parse(currUser)
    return currUser

}

async function add({ username, password, imgUrl }) {
    const user = {
        _id: _makeId(),
        username,
        password,
        profileImg: imgUrl,
        isAdmin: false,
        quizzes: [],
        friends: []
    }
    await gUsers.unshift(user)
    
    // const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)

}

async function updateUserQuizzes(addQuizUser,quizId) {
    addQuizUser.quizzes.unshift({quizId})
    try{
        // await storageService.put('user', addQuizUser);
        const idx= gUsers.findIndex(user=>user._id===addQuizUser.id)
        gUsers[idx]=addQuizUser;
    }catch(err){
        console.log(err);
    }
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}