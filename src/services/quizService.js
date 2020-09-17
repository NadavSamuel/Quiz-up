import axios from 'axios'
const BASE_URL = 'http://localhost:3001/quiz'

const resolveData = res => res.data

const gQuizzes = [
    {
        "_id": "q101",
        "title": "The History of Israel",
        "img": "https://images.unsplash.com/photo-1550103560-199ddb5aded5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
        "tags": [
            "history",
            "israel",

        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "David Cohen",
            "imgUrl": "http://some-img"
        },
        "quests": [
            {
                "id": "bkjbk1434324",
                "txt": "Who was the israelian that won an Novel?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "Shay Agnon",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "Itzhak Rabin",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "Menachem Begin",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Benjamin Netanyahu",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            },
            {
                "id": "bkjbk1434324",
                "txt": "When does Independence Day fall?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "5th Of Iyyar",
                        "isCorrect": true,
                        "count": 7
                    },
                    {
                        "txt": "5th of Nisan",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "3rd of Sh'vat",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "25th of Elul",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            },
            {
                "id": "bkjbk1434324",
                "txt": "What is the length of the presidency?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "4 Years",
                        "isCorrect": false,
                        "count": 7
                    },
                    {
                        "txt": "5 Years",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "6 Years",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "7 Years",
                        "isCorrect": true,
                        "count": 5
                    }
                ],

            },
            {
                "id": "bkjbk1434324",
                "txt": "Who was the third president?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "Efraim Katzir",
                        "isCorrect": false,
                        "count": 7
                    },
                    {
                        "txt": "Zalman Shazar",
                        "isCorrect": true,
                        "count": 14
                    },
                    {
                        "txt": "Moshe Sharet",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Itzhak Ben Tzvi",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            },
            {
                "id": "bkjbk1434324",
                "txt": "How many judges in the Supreme Court?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "21",
                        "isCorrect": false,
                        "count": 7
                    },
                    {
                        "txt": "12",
                        "isCorrect": false,
                        "count": 14
                    },
                    {
                        "txt": "15",
                        "isCorrect": true,
                        "count": 12
                    },
                    {
                        "txt": "9",
                        "isCorrect": false,
                        "count": 5
                    }
                ],

            },
            {
                "id": "bkjb11434324",
                "txt": "Which country helped build the reactor in Dimona?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "France",
                        "isCorrect": true,
                        "count": 5
                    },
                    {
                        "txt": "U.S.A",
                        "isCorrect": false,
                        "count": 25
                    },
                    {
                        "txt": "China",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "United Arab Emirates",
                        "isCorrect": false,
                        "count": 2
                    }
                ],

            },
            {
                "id": "bqjb11434324",
                "txt": "Whose image appears on a NIS 50 bill?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "Haim Nahman Bialik",
                        "isCorrect": false,
                        "count": 5
                    },
                    {
                        "txt": "David Ben Gurion",
                        "isCorrect": false,
                        "count": 25
                    },
                    {
                        "txt": "Haim Vaitzman",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Shaul Tshernihovski",
                        "isCorrect": true,
                        "count": 2
                    }
                ],

            },
            {
                "id": "bqjb11434324",
                "txt": "Whose image appears on a NIS 50 bill?",
                "style": [
                    "solid",
                    "crazy",
                    "school"
                ],
                "displayedCount": 100,
                "answers": [
                    {
                        "txt": "Haim Nahman Bialik",
                        "isCorrect": false,
                        "count": 5
                    },
                    {
                        "txt": "David Ben Gurion",
                        "isCorrect": false,
                        "count": 25
                    },
                    {
                        "txt": "Haim Vaitzman",
                        "isCorrect": false,
                        "count": 12
                    },
                    {
                        "txt": "Shaul Tshernihovski",
                        "isCorrect": true,
                        "count": 2
                    }
                ],

            },
        ],
        "reviews": [
            {
                "id": "ytqyrtyrtd",
                "txt": "Good quiz about israel! Every israelian should DO!",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullName": "Ronit Avrahami",
                    "imgUrl": "/img/img2.jpg"
                }
            },
            {
                "id": "ytry1tyrtd",
                "txt": "Boring quiz.. gaza rules.",
                "rate": 1,
                "by": {
                    "_id": "u103",
                    "fullName": "Mohammad From Gaza",
                    "imgUrl": "/img/img3.jpg"
                }
            },
            {
                "id": "ytrrtyrtd",
                "txt": "BEST QUIZ!! I LOVVE ISRAEL! WANT TO VISIT THERE AFAP",
                "rate": 5,
                "by": {
                    "_id": "u101",
                    "fullName": "David Levi",
                    "imgUrl": "/img/img1.jpg"
                }
            },
        ],
        "allTimesPlayers": [
            { id: "u101", fullName: "David Levi", score: "100" },
            { id: "u103", fullName: "Mohammad From Gaza", score: "12" },
            { id: "u102", fullName: "Ronit Avrahami", score: "89" },
            { id: "u104", fullName: "Guest", score: "86" },
            { id: "u105", fullName: "Mike Jesfof", score: "52" },
            { id: "u106", fullName: "Tal Lahyani", score: "99" },
            { id: "u107", fullName: "Nadav Samuel", score: "95" },
            { id: "u108", fullName: "Or Damari", score: "32" },
            { id: "u109", fullName: "Meital Laza", score: "12" },
            { id: "u1010", fullName: "Miki Geva", score: "44" },
            { id: "u1011", fullName: "Tal Museri", score: "76" },
        ]
    }, {
        "_id": "q102",
        "title": "History of USA",
        "img": "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1064&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "James Buffet",
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
        "title": "History of Humanity",
        "img": "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Or Damari",
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
        "title": "Computer Games",
        "img": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "John Smith",
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
        "title": "MARVEL characters",
        "img": "https://images.unsplash.com/photo-1505489435671-80a165c60816?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=531&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Robert John Downey",
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
        "title": "Cats ",
        "img": "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=978&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Dima Vaisberg",
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
        "title": "TV Shows",
        "img": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Nadav Samuel",
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
        "title": "Nutrition",
        "img": "https://images.unsplash.com/photo-1548808957-e80207091212?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Tal Lahyani",
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
        "title": "Javascript for Advanced ",
        "img": "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Meital Lazarovich",
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
        "title": "HTML Basics",
        "img": "https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Meital Lazarovich",
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
        "title": "Spanish for starters",
        "img": "https://images.unsplash.com/photo-1489945052260-4f21c52268b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Rodrigo gonzales",
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
        "title": "React for EXPERTS",
        "img": "https://wallpapercave.com/wp/wp2465926.jpg",
        "tags": [
            "dogs",
            "animals"
        ],
        "difficulity": 3,
        "createdBy": {
            "_id": "u105",
            "fullName": "Didi the Indian",
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
