
export const utilService = {
  shuffle,
  getBestUsers,
  getTime,
  makeId
  
}
function shuffle(answers,value = false) {
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
  if(value && answers.length> 10) answers = answers.slice(0,9)

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
function getTime(timeStamp){
let m = new Date(timeStamp).getMinutes();
let s = new Date(timeStamp).getSeconds();

m = (m<10) ? '0' + m : m;
s = (s<10) ? '0' + s : s;

const currTime = m + ':' +s;
  return currTime
}
function makeId(length=5)
{
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i < length; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

//         let  questions  = this.state.quiz.quests || []
// questions = utilService.shuffle(questions,true)