
export const utilService = {
  shuffle,
  getBestUsers,
  getTime,
  makeId,
  getMostPopular,
  getTopRated,
  getRandom,
  getRandomColor,
  getRate,
  getRandomGuest
}
function shuffle(answers, value = false) {
  var currentIndex = answers.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = answers[currentIndex];
    answers[currentIndex] = answers[randomIndex];
    answers[randomIndex] = temporaryValue;
  }
  if (value && answers.length > 10) answers = answers.slice(0, 9)

  return answers
}

function getBestUsers(quiz) {
  // const { quiz } = this.state
  var bestPlayers = [...quiz.allTimesPlayers];
  bestPlayers.sort((player1, player2) => {
    return (player2.score - player1.score)
  })
  return bestPlayers.slice(0, 10);
}
function getTime(timeStamp) {
  let m = new Date(timeStamp).getMinutes();
  let s = new Date(timeStamp).getSeconds();

  m = (m < 10) ? '0' + m : m;
  s = (s < 10) ? '0' + s : s;

  const currTime = m + ':' + s;
  return currTime
}
function makeId(length = 5) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function getMostPopular(quizzes) {
  var mostPopular = [...quizzes]
  mostPopular = mostPopular.sort((quiz1, quiz2) => {
    return quiz2.allTimesPlayers.length - quiz1.allTimesPlayers.length
  })
  return mostPopular
}

function getTopRated(quizzes) {
  var topRated = [...quizzes]
  topRated = topRated.sort((quiz1, quiz2) => {
    const rate1 = getRate(quiz1)
    console.log("getTopRated -> rate1", rate1)
    const rate2 = getRate(quiz2)
    console.log("getTopRated -> rate2", rate2)
    return rate2 - rate1
  })
  return topRated
}

function getRandom(quizzes) {
  var random = [...quizzes]
  random = quizzes.sort((quiz) => Math.random() - 0.5);
  return random
}

function getRate(quiz) {
  const sum = quiz.reviews.reduce((acc, review) => {
    return acc + review.rate
  }, 0)

  const rate = (sum / quiz.reviews.length).toFixed(2);
  if (isNaN(rate)) return 0
  return +rate
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomGuest(){
  var guest= 'guest'
  var digit='0123456789'
  for (var i = 0; i < 3; i++) {
    guest += digit[Math.floor(Math.random() * 10)];
  }
  return guest
}



//         let  questions  = this.state.quiz.quests || []
// questions = utilService.shuffle(questions,true)