let playerX = document.querySelector(".Start .StartButton .PlayerX");
let playerO = document.querySelector(".Start .StartButton .PlayerO");
let MainContainer = document.querySelector(".container");
let StartPage = document.querySelector(".Start");
let Slider = document.querySelector(".slider");
let Choose = document.querySelector(".container");
let Oturn = document.querySelector(".choosePlayer .OTurn");
let Xturn = document.querySelector(".choosePlayer .XTurn");
let box = document.querySelectorAll(".container .Playgorund .box");
let textarea = document.querySelectorAll(".texterea");
let Draw = document.querySelector(".Draw");
let Won = document.querySelector(".WonX");
let WonPlayer = Won.querySelector(".WonX .Titleend h1 .winnow");
let LastBtn = document.querySelectorAll(".Button");
let DrawSituation = true;


// This is for Starting player choosing page to play-ground page;
playerX.onclick = (()=>{
    StartPage.classList.add("show");
    Choose.classList.add("activenow");
    Array.from(textarea).forEach((e)=>{
        e.innerHTML = '';
    });
});
playerO.onclick = (()=>{
    StartPage.classList.add("show");
    Choose.classList.add("active");
    Array.from(textarea).forEach((e)=>{
        e.innerHTML = '';
    });
});

// Get Value for playground box value
let turn = "X";
let turnO = "O";

// This is for O player
function turnnowO(){
    return turnO == "O" ? "X" : "O";
}
// This is for X player
function turnnow(){
        return turn == "X" ? "O" : "X";
}


// This is for click on any playground box and put the value on clicked box
    Array.from(box).forEach(e =>{
        let textarea = e.querySelector(".texterea");
        e.onclick = () =>{
            if(textarea.innerText === ''){
                if(Choose.classList.contains("activenow")){
                    textarea.innerText = turn;
                    // turn = turnnow();
                }else{
                    textarea.innerText = turnO;
                    // turnO = turnnowO();
                }
                bot();
                
                // This is for put the value X and O in the box.
                if(textarea.innerText == "X"){
                    Slider.style.left = "50%"
                    Xturn.style.color = "#56baed";
                    Oturn.style.color = "#fff";
                    
                }else{
                    Slider.style.left = "0%"
                    Xturn.style.color = "#fff";
                    Oturn.style.color = "#56baed";
                }
            }
            result();
            Drawresult();
            e.style.pointerEvents = "none";
            MainContainer.style.pointerEvents = "none";
        }
    })

    // This is for result
    // function result(){

    function result(){
        let r = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ];
        r.forEach((e) =>{

            if((textarea[e[0]].innerText == textarea[e[1]].innerText) && (textarea[e[2]].innerText == textarea[e[1]].innerText) && (textarea[e[0]].innerText !== '')){
                if(textarea[e[0]].innerText == "O"){
                    WonPlayer.innerText = "O"
                }
                Won.classList.add("ShowWon");
                MainContainer.classList.remove("activenow");
                MainContainer.classList.remove("active");
                DrawSituation = false;
            };
        });
    };

    // This is for Draw
    function Drawresult(){
        if(DrawSituation === true){
            if((textarea[0].innerText !== '') && (textarea[1].innerText !== '') && (textarea[2].innerText !== '') && (textarea[3].innerText !== '') && (textarea[4].innerText !== '') && (textarea[5].innerText !== '') && (textarea[6].innerText !== '') && (textarea[7].innerText !== '') && (textarea[8].innerText !== '')){
                Draw.classList.add("ShowDraw");
                MainContainer.classList.remove("activenow");
                MainContainer.classList.remove("active");

            };
        }
    };

    // This is for Reloade win and draw page
    Array.from(LastBtn).forEach( (e)=> {

        e.onclick = () =>{
            location.reload();
        };        
    })

    // This for bot
    function bot(){
        if(DrawSituation === true){
            let botarray = [];
            for (let i = 0; i < textarea.length; i++) {
                if(textarea[i].innerText == ''){
                    botarray.push(i);
                }
                
            }

            
            let randombox = botarray[Math.floor(Math.random() * botarray.length)]       // in this incuation i am confused how to work it botarray;
            console.log(randombox);
            if(botarray.length > 0){
                setTimeout(()=>{
                    if(Choose.classList.contains("activenow")){
                        textarea[randombox].innerText = turnO;
                    }else{
                        textarea[randombox].innerText = turn;
                    }
                    if(textarea[randombox].innerText == "X"){
                        Slider.style.left = "50%"
                        Xturn.style.color = "#56baed";
                        Oturn.style.color = "#fff";
                        
                    }else{
                        Slider.style.left = "0%"
                        Xturn.style.color = "#fff";
                        Oturn.style.color = "#56baed";
                    }
                    result();
                    Drawresult();   
                    textarea[randombox].style.pointerEvents = "none";                 
                    box[randombox].style.pointerEvents = "none";
                    MainContainer.style.pointerEvents = "auto";
                }, randombox * 200)
            }
        }
    };