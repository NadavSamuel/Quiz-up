
export const utilService = {
  shuffleAnswers,
  getBestUsers
}
function shuffleAnswers(answers) {
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