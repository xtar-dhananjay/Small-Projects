let StartBtn = document.querySelector(".star-Quiz Button");
let StartBox = document.querySelector(".star-Quiz");
let InfoBox = document.querySelector(".Quiz-info");
let QuizBox = document.querySelector(".quiz-box");
let ExitInfoBoxBtn = document.querySelector(".Quiz-info .ExitInfoBox");
let ContinueBtn = document.querySelector(".Quiz-info .ContinueBtn");
let QuizTexts = document.querySelector(".quiz-box section");
let Option = document.querySelectorAll(".quiz-box section .option-list .option");
let NextBtn = document.querySelector(".quiz-box footer button");
let TotalQuestions = document.querySelector(".quiz-box footer .total-que");
let ResultBox = document.querySelector(".result-box");
let OptionList = document.querySelectorAll(".quiz-box .option-list");
let Score = document.querySelector(".result-box .score-text");
let TimeLeft = document.querySelector(".quiz-box .timer .Time");
let TimeTitle = document.querySelector(".quiz-box .timer .Time-Title");
let TimeLine = document.querySelector(".quiz-box header .TimeLine");
let RestartBtn = document.querySelector(".result-box .buttons .restart");
let QuitBtn = document.querySelector(".result-box .buttons .quit");


// asume values
let QuestionCount = 1;
let QuizCount = 0;
let AnswerCount = 0;
let TimeNow = 15;
let TimeLineWidth = 20;

StartBtn.onclick = () =>{       // This is for Starting Button Actions
    StartBox.classList.add("StartBoxHide")
    InfoBox.classList.add("InfoBoxHide")
};

ExitInfoBoxBtn.onclick = () =>{         // This is for InfoBox Exit Button Actions
    InfoBox.classList.remove("InfoBoxHide")
    StartBox.classList.remove("StartBoxHide")
}

ContinueBtn.onclick = () =>{        // This is for InfoBox Continue Button Actions
    InfoBox.classList.remove("InfoBoxHide")
    QuizBox.classList.add("QuizBoxHide")
    Quiz(QuizCount);
    QuestionCount++;
    timernow();
    TimeLineStart();
}

    // This is for Quiz Content

function Quiz(index){
    let QuizTextsTag = `<div class="que-text">${index + 1}. ${Quastions[index].Question}</div>
    <div class="option-list">
        <div class="option">
            <span>${Quastions[index].Option[0]}</span>
           
        </div>
        <div class="option">
            <span>${Quastions[index].Option[1]}</span>
           
        </div>
        <div class="option">
            <span>${Quastions[index].Option[2]}</span>
        </div>
        <div class="option">
            <span>${Quastions[index].Option[3]}</span>
        </div>
    </div>`

    QuizTexts.innerHTML = QuizTextsTag;

    // This is for adding all " calss : Option " on onclick event with same name.
    Option = QuizTexts.querySelectorAll(".option");
    for (let i = 0; i < Option.length; i++) {
        Option[i].setAttribute("onclick", "Select(this)")
    }
    
    // This is for count Questions
    TotalQuestions.innerHTML = `<span><p>${QuestionCount}</p>Of<p>${Quastions.length}</p>Queations</span>`

}


// This is for Next Quiz Button
NextBtn.onclick = () =>{

    if(Quastions.length - 1 > QuizCount){
        QuizCount ++;
        Quiz(QuizCount);
        QuestionCount++;

        if(QuizCount > Quastions.length - 2){
            NextBtn.textContent = "Submit";
        }
        
    }else{
        ResultBox.classList.add("ResultBoxHide")
        QuizBox.classList.remove("QuizBoxHide")
    }
    
    QuizTexts.style.pointerEvents = "auto";
    NextBtn.classList.remove("ActiveBtn")
    result();
    clearInterval(timer);           // This for timer
    TimeNow = 15;
    timernow();
    TimeLeft.textContent = 15; 
    clearInterval(TimeLineNow);           // This for TimeLine
    TimeLineTimer()
    TimeLineStart()
    TimeLineWidth = 20;
    TimeTitle.innerText = "Time Left";      // This is for chnging Time Title
};


// This is for click any option and actions
let tick = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let cross = ' <div class="icon cross"><i class="fas fa-times"></i></div>';
function Select(CurrectAnswer){
    CurrectText = Quastions[QuizCount].answer;
    if(CurrectAnswer.innerText == CurrectText){
        CurrectAnswer.classList.add("Currect");
        CurrectAnswer.insertAdjacentHTML("beforeend", tick)
        AnswerCount++;
        result();
        
    }else{
        CurrectAnswer.classList.add("Uncurrect");
        CurrectAnswer.insertAdjacentHTML("beforeend", cross)

        
        Option = document.querySelectorAll(".quiz-box section .option-list .option");
        for (let i = 0; i < Option.length; i++) {

            if(Option[i].innerText == CurrectText){
                Option[i].classList.add("Currect");
            }
        }
    }

    // QuizTexts.style.pointerEvents = "none";
    NextBtn.classList.add("ActiveBtn")    

    for (let i = 0; i < Option.length; i++) {
        Option[i].classList.add("OffPointer")
    }
    
    clearInterval(timer);
    clearInterval(TimeLineNow);
}

// This is for Quiz Results
function result(){
    if(AnswerCount >= 3){
        
        resultTag = `        <div class="score-text">
                    <span>and Congrats <p class="score-Eogi">🎉</p>, You got <p>${AnswerCount}</p> out of <p>${Quastions.length}</p></span>
                </div>`
        Score.innerHTML = resultTag;
    }else if(AnswerCount >= 2){
    
        resultTag = `        <div class="score-text">
                    <span>and Nice <p class="score-Eogi">😃</p>, You got <p>${AnswerCount}</p> out of <p>${Quastions.length}</p></span>
                </div>`
        Score.innerHTML = resultTag;
    }else{
        
        resultTag = `        <div class="score-text">
                    <span>and sorry <p class="score-Eogi">🥴</p>, You got only <p>${AnswerCount}</p> out of <p>${Quastions.length}</p></span>
                </div>`
        Score.innerHTML = resultTag;

    }

}

// This is for timer
    function TimeCount(){
        if(TimeNow > 0){
            TimeNow--;
            if(TimeNow >= 10){
                TimeLeft.textContent = TimeNow; 
            }else if(TimeNow <= 9){
                TimeLeft.textContent = `0${TimeNow}`; 
            }
            
        }else{
            clearInterval(timer)
            TimeTitle.innerText = "Time Stop";      // This is for chnging Time Title
            NextBtn.classList.add("ActiveBtn")
            for (let i = 0; i < Option.length; i++) {
                if(Option[i].innerText == Quastions[QuizCount].answer){
                    Option[i].classList.add("Currect");
                }           
            }
        }
    }
function timernow() { timer = setInterval(TimeCount, 1000)}


// This is for TimeLine
function TimeLineTimer(){
    TimeLineWidth++;
    TimeLine.style.width = TimeLineWidth + "px";
    if(TimeLineWidth > 540){
        clearInterval(TimeLineNow)

    }
}

function TimeLineStart(){
    TimeLineNow = setInterval(TimeLineTimer, 29);
}

// Restart for Button Actions
RestartBtn.onclick = () => {
    ResultBox.classList.remove("ResultBoxHide")
    QuizBox.classList.add("QuizBoxHide")
    QuestionCount = 1;
    QuizCount = 0;
    AnswerCount = 0;
    TimeNow = 15;
    TimeLineWidth = 20;
    Quiz(QuizCount);
    QuestionCount++;
    NextBtn.textContent = "Nest Quiz";
};

// This is for Quit Button
QuitBtn.onclick = () => {
    ResultBox.classList.remove("ResultBoxHide")
    QuizBox.classList.remove("QuizBoxHide")
    StartBox.classList.remove("StartBoxHide")
    QuestionCount = 1;
    QuizCount = 0;
    AnswerCount = 0;
    TimeNow = 15;
    TimeLineWidth = 20;
    clearInterval(timer);
    clearInterval(TimeLineNow);
    NextBtn.textContent = "Nest Quiz";
}