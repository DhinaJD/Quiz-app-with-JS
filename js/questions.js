export default function Questions(question, choices, answerKey){
  this.question = question;
  this.choices = choices;
  this.answerKey =  answerKey;
}

Questions.prototype.isCorrect = function(userGuess){
  return userGuess === this.answerKey;
}
