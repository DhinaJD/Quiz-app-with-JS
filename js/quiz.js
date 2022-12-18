/* quiz app that needs all questions / score / what question currently we're in */
export default function Quiz(questions){
  this.questions = questions;
  this.score = 0;
  this.currentIndex = 0;
}
Quiz.prototype.getCurrentQuestion =  function(){
  return this.questions[this.currentIndex];
}
Quiz.prototype.nextIndex =  function(){
  return this.currentIndex++;
}
Quiz.prototype.gameEnd =  function(){
  return this.currentIndex === this.questions.length
}
Quiz.prototype.guess =  function(userGuess) {
  const current_question =  this.questions[this.currentIndex];
  if(current_question.isCorrect(userGuess)){
    this.score++;
  }
  this.nextIndex();
}
Quiz.prototype.reset = function(){
  this.score = 0;
  this.currentIndex = 0;
}