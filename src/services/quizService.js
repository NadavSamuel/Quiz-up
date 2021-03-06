import axios from 'axios'
import storageService from './asyncStorageService'
import httpService from './httpService'
const BASE_URL = 'quiz'

const resolveData = res => res.data

var gQuizzes = [
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
                "id": "1kjbk1434324",
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
                        "isCorrect": "true",
                        "count": 7
                    },
                    {
                        "txt": "Itzhak Rabin",
                        "isCorrect": "false",
                        "count": 14
                    },
                    {
                        "txt": "Menachem Begin",
                        "isCorrect": "false",
                        "count": 12
                    },
                    {
                        "txt": "Benjamin Netanyahu",
                        "isCorrect": "false",
                        "count": 5
                    }
                ],

            },
            {
                "id": "2kjbk1434324",
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
                        "isCorrect": "true",
                        "count": 7
                    },
                    {
                        "txt": "5th of Nisan",
                        "isCorrect": "false",
                        "count": 14
                    },
                    {
                        "txt": "3rd of Sh'vat",
                        "isCorrect": "false",
                        "count": 12
                    },
                    {
                        "txt": "25th of Elul",
                        "isCorrect": "false",
                        "count": 5
                    }
                ],

            },
            {
                "id": "3kjbk1434324",
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
                        "isCorrect": "false",
                        "count": 7
                    },
                    {
                        "txt": "5 Years",
                        "isCorrect": "false",
                        "count": 14
                    },
                    {
                        "txt": "6 Years",
                        "isCorrect": "false",
                        "count": 12
                    },
                    {
                        "txt": "7 Years",
                        "isCorrect": "true",
                        "count": 5
                    }
                ],

            },
            {
                "id": "4kjbk1434324",
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
                        "isCorrect": "false",
                        "count": 7
                    },
                    {
                        "txt": "Zalman Shazar",
                        "isCorrect": "true",
                        "count": 14
                    },
                    {
                        "txt": "Moshe Sharet",
                        "isCorrect": "false",
                        "count": 12
                    },
                    {
                        "txt": "Itzhak Ben Tzvi",
                        "isCorrect": "false",
                        "count": 5
                    }
                ],

            },
            {
                "id": "5kjbk1434324",
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
                        "isCorrect": "false",
                        "count": 7
                    },
                    {
                        "txt": "12",
                        "isCorrect": "false",
                        "count": 14
                    },
                    {
                        "txt": "15",
                        "isCorrect": "true",
                        "count": 12
                    },
                    {
                        "txt": "9",
                        "isCorrect": "false",
                        "count": 5
                    }
                ],

            },
            {
                "id": "6kjb11434324",
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
                        "isCorrect": "true",
                        "count": 5
                    },
                    {
                        "txt": "U.S.A",
                        "isCorrect": "false",
                        "count": 25
                    },
                    {
                        "txt": "China",
                        "isCorrect": "false",
                        "count": 12
                    },
                    {
                        "txt": "United Arab Emirates",
                        "isCorrect": "false",
                        "count": 2
                    }
                ],

            },
            {
                "id": "7qjb11434324",
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
                        "isCorrect": "false",
                        "count": 5
                    },
                    {
                        "txt": "David Ben Gurion",
                        "isCorrect": "false",
                        "count": 25
                    },
                    {
                        "txt": "Haim Vaitzman",
                        "isCorrect": "false",
                        "count": 12
                    },
                    {
                        "txt": "Shaul Tshernihovski",
                        "isCorrect": "true",
                        "count": 2
                    }
                ],

            },
            {
                "id": "8qjb11434324",
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
                        "isCorrect": "false",
                        "count": 5
                    },
                    {
                        "txt": "David Ben Gurion",
                        "isCorrect": "false",
                        "count": 25
                    },
                    {
                        "txt": "Haim Vaitzman",
                        "isCorrect": "false",
                        "count": 12
                    },
                    {
                        "txt": "Shaul Tshernihovski",
                        "isCorrect": "true",
                        "count": 2
                    }
                ],

            },
        ],
        "reviews": [
            {
                "id": "yqyrtyrtd",
                "txt": "Good quiz about israel! Every israelian should DO!",
                "rate": 4,
                "by": {
                    "_id": "u101",
                    "fullName": "Ronit Avrahami",
                    "imgUrl": "/img/img2.jpg"
                }
            },
            {
                "id": "ytr4tyrtd",
                "txt": "Boring quiz.. gaza rules.",
                "rate": 1,
                "by": {
                    "_id": "u102",
                    "fullName": "Mohammad From Gaza",
                    "imgUrl": "/img/img3.jpg"
                }
            },
            {
                "id": "yt5tyrtd",
                "txt": "Good quiz, waiting for harder one!",
                "rate": 5,
                "by": {
                    "_id": "u103",
                    "fullName": "Binyamin Levi",
                    "imgUrl": "/img/img1.jpg"
                }
            },
            {
                "id": "ztrqtyrtd",
                "txt": "Good one waiting for more!",
                "rate": 4,
                "by": {
                    "_id": "u104",
                    "fullName": "Ron Shmueli",
                    "imgUrl": "/img/img1.jpg"
                }
            },
            {
                "id": "y5rtyrtd",
                "txt": "BEST QUIZ!! I LOVVE ISRAEL! WANT TO VISIT THERE AFAP",
                "rate": 5,
                "by": {
                    "_id": "u105",
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
            {
                "fullName": "Asaf Margalit",
                "score": 150
            },
            {
                "fullName": "Popo the great",
                "score": 220
            }
        ]
    }
]
export const quizService = {
    getByTag,
    query,
    getById,
    update,
    remove,
    add,
    getImage,
    getRandomQuiz
    // save
}
window.quizService = quizService;

async function getRandomQuiz() {
    const res = await axios.get(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`)
    const quizs = res.data.results
    const quizToReturn = {
        title: quizs[0].category,
        quests: quizs.map(quest => {
            return {
                answers: [{ count: 0, isCorrect: true, txt: quest.correct_answer },
                { count: 0, isCorrect: false, txt: quest.incorrect_answers[0] },
                { count: 0, isCorrect: false, txt: quest.incorrect_answers[1] },
                { count: 0, isCorrect: false, txt: quest.incorrect_answers[2] },

                ],
                txt: quest.question,
                displayedCount: 0,
                id: _makeId(),
                img: '',
                style: 'solid'
            }
        }),
        // displayedCount: 0,
        style: 'solid',
        reviews: [],
        allTimesPlayers: [],
        difficulity: 1,
        questImg: '',
        img: '',
        difficulity: 1,
        tags: ''
    }
    return quizToReturn
}

async function getByTag(tag, filterBy) {
    // eturn axios.get(`${BASE_URL}`,{params: filterBy})
    console.log('filterBy', filterBy);
    var queryStr = (!filterBy.title)? '' : `?title=${filterBy.title}`

    try {
        var quizzes = await httpService.get(`${BASE_URL}${queryStr}`, { params: filterBy });



        if (tag === 'all') return quizzes
        if (quizzes) var quizzesToReturn = quizzes.filter(quiz => quiz.tags.includes(tag));
        return quizzesToReturn;
    } catch (err) {
        console.log(err);
    }
}

async function getImage(keyword) {
    var prmRes = axios.get(`https://api.unsplash.com/search/photos/?client_id=PA3Oow8kvS9lXoH0KnT7yxn2e_FAaKFzROSIXsAdPNE&query=${keyword}`)
    return prmRes.then(res => {
        return res.data
    })
}


async function query() {

    try {
        var quizzes = await httpService.get(`${BASE_URL}`,);
        if (quizzes.length === 0) {
            var str = JSON.stringify(gQuizzes);
            localStorage.setItem('quiz', str)
            return gQuizzes
        }

        return quizzes
    } catch (err) {
        console.log(err);
    }
}

async function add(quiz) {
    try {
        var newQuiz = await httpService.post('quiz', quiz);

        return newQuiz
    } catch (err) {
        console.log(err);
    }
}

async function update(quiz) {
    try {
        await httpService.put(`quiz/${quiz._id}`, quiz);
    } catch (err) {
        console.log(err);
    }
}

async function getById(quizId) {
    try {
        var quiz = await httpService.get(`quiz/${quizId}`);
        return quiz
    } catch (err) {
        console.log(err);
    }
}

async function remove(quizId) {
    try {
        await storageService.remove('quiz', quizId);
    } catch (err) {
        console.log(err);
    }
}


function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}