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
            { id: "u101", fullName: "Yossef Hamkapez", score: "126" },
            { id: "u102", fullName: "David Hamkapez", score: "131" },
            { id: "u103", fullName: "Jackson Hamkapez", score: "190" },
        ]
    }, {
        "_id": "q102",
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
        "_id": "q103",
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
        "_id": "u104",
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
        "_id": "q105",
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
        "_id": "q111",
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
        "_id": "q112",
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
