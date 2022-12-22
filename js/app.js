import Questions from "./questions.js";
import Quiz from "./quiz.js";

const App = (() =>{
  //catch the DOM
  const quizQuestionEl = document.querySelector(".jabquiz__question");
  const trackerEl = document.querySelector(".jabquiz__tracker");
  const progressEl = document.querySelector(".progress__inner");
  const taglineEl = document.querySelector(".jabquiz__tagline");
  const choicesEl = document.querySelector(".jabquiz__choices");
  const nextBtn = document.querySelector(".jabquiz__footer .next");
  const restartBtn = document.querySelector(".jabquiz__footer .restart");

  const q1 = new Questions(
    "what is 5 * 5",
    [100,25,3,12],
    1
  )
  const q2 = new Questions(
    "what is 1 + 1",
    [1,4,2,3],
    2
  )
  const q3 = new Questions(
    "what is json",
    ["jbb" , "35" ,"ninja","javascript object notation"],
    3
  )
  const q4 = new Questions(
    "what is www stands for",
    ["world wide web" , "wise word web", "wisdom world web" , "wild win web"],
    0
  )
  const q5 = new Questions(
    "what library is best for js",
    ["vue" , "kotline" , "react", "angular"],
    2
  )

  const quiz = new Quiz([q1,q2,q3,q4,q5]);

  const listeners = () =>{
    nextBtn.addEventListener("click", function() {
      const selectedRadioElem =  document.querySelector("input[name='choice']:checked");
      if(selectedRadioElem){
        let key = Number(selectedRadioElem.getAttribute("data-order"));
        quiz.guess(key);
        renderAll();
        quizQuestionEl.scrollIntoView();
      }
    });
    restartBtn.addEventListener("click", function(){
      //reset the quiz
      quiz.reset();
      //render all element
      renderAll();
      //next btn back
      nextBtn.style.opacity=1;
      quizQuestionEl.scrollIntoView();
    })
  }

  const changeText = (elem, value) =>{
    elem.innerHTML = value
  }

  const renderQuestion = () =>{
    const appQuestion = quiz.getCurrentQuestion().question;
    changeText(quizQuestionEl,appQuestion);
  }

  const renderChoices = () =>{
    let markup ="";
    const currentChoice = quiz.getCurrentQuestion().choices;
    currentChoice.forEach((elem, index)=>{
      markup += `
      <li class="jabquiz__choice"><input type="radio" name="choice" data-order="${index}" id="choice${index}">
          <label for="choice${index}" class="jabquiz__label"><i></i> <span>${elem}<span></label>
      </li>`
    })
    changeText(choicesEl, markup);
  }

  const renderTracker = () =>{
    let trackerText = `${quiz.currentIndex + 1} of ${quiz.questions.length}`
    changeText(trackerEl, trackerText);
  }

  const getPercentage = (num1, num2) =>{
    return Math.round((num1/num2) * 100);
  }

  const launch = (width, maxPercentage) =>{
    let loadingBar = setInterval(function(){
      if(width > maxPercentage){
        clearInterval(loadingBar)
      }else{
        width++
        progressEl.style.width = `${width}%`
      }
    }, 3)
  }

  const renderProgress = () =>{
    //width
    let currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
    //launch(0, width)
    launch(0, currentWidth);
  }
  
  const renderTagline = () =>{
    changeText(taglineEl, "Pick an option below!");
  }

  const renderEndScreen = () =>{
    if(quiz.score < 2){
      changeText(quizQuestionEl, "Better Luck Next Time!");
    }else{
      changeText(quizQuestionEl, "Great job!");
    }
    changeText(taglineEl, "Completed!")
    changeText(trackerEl, `Your Score:${getPercentage(quiz.score, quiz.questions.length)}%`);
    nextBtn.style.opacity=0;
    renderProgress();
  }

  const renderAll = _ =>{
    if(quiz.gameEnd()){
      //Render End screen
      renderEndScreen();
    }else{
      // 1.Render Questions
       renderQuestion();
      // 2.Render Choices
       renderChoices();
      // 3.Render Tracker
       renderTracker();
      // 4.Render Progress
      renderProgress();
      //5.Render tagline
      renderTagline();
    }
  }
  
  return{
    run:renderAll,
    listeners:listeners
  }
  
})();

App.run();
App.listeners();