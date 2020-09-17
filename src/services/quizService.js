import axios from 'axios'
const BASE_URL = 'http://localhost:3001/quiz'

const resolveData = res => res.data

const gQuizzes = [
    {
        "_id": "q101",
        "title": "dogs are awesome",
        "img": "https://res-console.cloudinary.com/dif8yy3on/thumbnails/transform/v1/image/upload//v1599997001/dHVxaWdhMHJucHkzdGxjbjZpZXk=/drilldown?0.5685836439447682",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "Simple and fun quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            },
            {
                "id": "ytry1tyrtd",
                "txt": "boring quiz",
                "rate": 1,
                "by": {
                    "_id": "u103",
                    "fullName": "user3",
                    "imgUrl": "/img/img3.jpg"
                }
            },
            {
                "id": "ytrrtyrtd",
                "txt": "BEST QUIZ EVER",
                "rate": 5,
                "by": {
                    "_id": "u101",
                    "fullName": "user1",
                    "imgUrl": "/img/img1.jpg"
                }
            },
        ],
        "allTimesPlayers": [
            { id: "u101", fullName: "Yossef Hamkapez", score: "126" },
            { id: "u102", fullName: "David Hamkapez", score: "131" },
            { id: "u103", fullName: "Jackson Hamkapez", score: "190" },
            { id: "u104", fullName: "Miki Hamkapez", score: "110" },
            { id: "u105", fullName: "Puki Hamkapez", score: "490" },
            { id: "u106", fullName: "Tuki Hamkapez", score: "15" },
            { id: "u107", fullName: "Ruki Hamkapez", score: "140" },
            { id: "u108", fullName: "Lula Hamkapez", score: "111" },
            { id: "u109", fullName: "Zuzi Hamkapez", score: "211" },
            { id: "u1010", fullName: "Burekas Hamkapez", score: "55" },
            { id: "u1011", fullName: "Jiki Hamkapez", score: "82" },
        ]
    }, {
        "_id": "q102",
        "title": "dogs are awesome",
        "img": "https://res.cloudinary.com/dif8yy3on/image/upload/v1600149294/zyxugb0oal4j9qujymrp.png",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }, {
        "_id": "q103",
        "title": "dogs are awesome",
        "img": "https://res.cloudinary.com/dif8yy3on/image/upload/v1600149274/st1jaeov8p8ehbjexq5e.png",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }, {
        "_id": "u104",
        "title": "dogs are awesome",
        "img": "https://res.cloudinary.com/dif8yy3on/image/upload/v1600011748/zovgcrhnelxprpzhphqx.jpg",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }, {
        "_id": "q105",
        "title": "dogs are awesome",
        "img": "https://res.cloudinary.com/dif8yy3on/image/upload/v1599990402/sample.jpg",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }, {
        "_id": "q106",
        "title": "dogs are awesome",
        "img": "https://res-console.cloudinary.com/dif8yy3on/thumbnails/transform/v1/image/upload//v1599997001/dHVxaWdhMHJucHkzdGxjbjZpZXk=/drilldown?0.5685836439447682",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }, {
        "_id": "q107",
        "title": "dogs are awesome",
        "img": "https://res-console.cloudinary.com/dif8yy3on/thumbnails/transform/v1/image/upload//v1599997001/dHVxaWdhMHJucHkzdGxjbjZpZXk=/drilldown?0.5685836439447682",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }, {
        "_id": "q108",
        "title": "dogs are awesome",
        "img": "https://images.unsplash.com/photo-1600195556579-d81d3f386e55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }, {
        "_id": "q109",
        "title": "dogs are awesome",
        "img": "https://res-console.cloudinary.com/dif8yy3on/thumbnails/transform/v1/image/upload//v1599997001/dHVxaWdhMHJucHkzdGxjbjZpZXk=/drilldown?0.5685836439447682",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }, {
        "_id": "q110",
        "title": "dogs are awesome",
        "img": "https://images.unsplash.com/photo-1600262486318-1848b5da491a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80https://res-console.cloudinary.com/dif8yy3on/thumbnails/transform/v1/image/upload//v1599997001/dHVxaWdhMHJucHkzdGxjbjZpZXk=/drilldown?0.5685836439447682",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }, {
        "_id": "q111",
        "title": "dogs are awesome",
        "img": "https://images.unsplash.com/photo-1600195077077-7c815f540a3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=636&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "yossi",
                        "isCorrect": "true",
                        "count": 7
                    },
                    {
                        "txt": "Miki",
                        "isCorrect": "false",
                        "count": 14
                    },
                    {
                        "txt": "Puki",
                        "isCorrect": "false",
                        "count": 12
                    },
                    {
                        "txt": "Riki",
                        "isCorrect": "false",
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }, {
        "_id": "q112",
        "title": "dogs are awesome",
        "img": "https://res.cloudinary.com/dif8yy3on/image/upload/v1600149253/n95kolhnzvxkn6ahg6c5.jpg",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Bob",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Whats the name?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "popolino",
                        "isCorrect": "true",
                        "count": 7
                    },
                    {
                        "txt": "baba",
                        "isCorrect": "false",
                        "count": 14
                    },
                    {
                        "txt": "buli",
                        "isCorrect": "false",
                        "count": 12
                    },
                    {
                        "txt": "ro",
                        "isCorrect": "false",
                        "count": 5
                    }
                ],

            }
        ],
        "reviews": [
            {
                "id": "ytryrtyrtd",
                "txt": "a great quiz",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ],
        "allTimesPlayers": [
            {}
        ]
    }
]
export const quizService = {
    query,
    getById,
    remove,
    save
}

function query() {
    return [...gQuizzes];
}

// function query(filterBy = {}) {
//     var queryParams = new URLSearchParams()
//     if (filterBy.vendor) queryParams.set('q', filterBy.vendor)
//     return axios.get(`${BASE_URL}?${queryParams}`)
//         .then(resolveData)
// }

function getById(quizId) {
    // return axios.get(`${BASE_URL}/${quizId}`)
    //     .then(resolveData)
    const quizToReturn = gQuizzes.find(quiz => quiz._id === quizId)
    return quizToReturn

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
