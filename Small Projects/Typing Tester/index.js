let TypingText = document.querySelector(".Container .paragraph p");
let inpField = document.querySelector(".MainContainer input");
let Mistakes = document.querySelector(".result .results .Mistakes");
let CPM = document.querySelector(".result .results .CPM");
let time = document.querySelector(".result .results .time");
let WPM = document.querySelector(".result .results .WPM");
let tryBtn = document.querySelector(".result button");

// esume values
let timestart;
let maxTime = 60;
let timeleft = maxTime;
let carcIndex = Mistakenow = 0;
let over = true;        
let timernow = false; 
// This is for random Paragraph.
function randomParagraphs(){
    let randIndex = Math.floor(Math.random() * Pragraph.length)     // This is for random paragraph mathod 
    TypingText.innerHTML = '';
    Pragraph[randIndex].split('').forEach(span => {
        spanTag = `<span>${span}</span>`;     // This is for passing paragraph in (.container p) html 
        TypingText.innerHTML += spanTag;
    });
    // This is for auto focus for input tag in (.MainContainer input) html
    document.addEventListener("keydown", () => inpField.focus())
    TypingText.addEventListener("click", () => inpField.focus())
}
randomParagraphs();
function checkTyping(){
    let TypeingChar = TypingText.querySelectorAll("span");      // This is for get all span value's 
    let TypedChar = inpField.value.split('')                   // This is for get all input values in array
    if(over === true){                          // This is for time over and input not containe values
        if(timernow == false){
            timestart = setInterval(update, 1000);
            timernow = true;
        }
        
        
        wpnNow = Math.round((((carcIndex - Mistakenow)/ 5) / (maxTime - timeleft)) * 60)        // This is for geting WPS value and put the value in (.WPS) html.
        wpnNow = wpnNow < 0 || !wpnNow || wpnNow === Infinity ? 0 : wpnNow;             // This is for currect result becouse without this in result show is Nan, Infifity so this solve problem halp this line code.
    
        WPM.innerText = wpnNow;
        // This is for backspace actions including remove all span decoration class's.
        if(TypedChar[carcIndex] == null){
            carcIndex--;
            TypeingChar[carcIndex].classList.remove("active");
            TypeingChar[carcIndex].classList.remove("highLight");
            if(TypeingChar[carcIndex].classList.contains("unactive")){
                TypeingChar[carcIndex].classList.remove("unactive");
                Mistakenow--;
                Mistakes.innerText = Mistakenow;             // This is for click backspace update show mistakes
            }else if(!TypeingChar[carcIndex].classList.contains("unactive")){   // This is for click backspace and get the CPM value 
                CpmNow--;
                CPM.innerText = CpmNow;
            }
            
            // This is for key action's including add all span decoration class's.
        }else{
            if(TypeingChar[carcIndex].innerText === TypedChar[carcIndex]){      // This is for put condition for input.value === paragraph.span.innerText.
                TypeingChar[carcIndex].classList.add("active");
            }else{
                TypeingChar[carcIndex].classList.add("unactive");
                Mistakenow++;
                Mistakes.innerText = Mistakenow;             // This is for show mistakes
            }
    
            // This is for geting value for CPM and update CPM value
            CpmNow = carcIndex+1 - Mistakenow;
            CPM.innerText = CpmNow;
    
            carcIndex++;
        }
        // This is for current character line animation and highlight.
        TypeingChar.forEach(span => span.classList.remove("highLight"))     // This is for removing all highlight calss in span.
        TypeingChar[carcIndex].classList.add("highLight");                  // This is for current word typing blink
    }

}

let TypeingChar = TypingText.querySelectorAll("span");      // This is for get all span value's 
TypeingChar[carcIndex].classList.add("highLight");      // This is for adding Starting typing word blinking.

function update(){
    if(timeleft > 0){
        timeleft--;
        time.innerText = timeleft;
        if(timeleft == 0){
            over = false;
        }
    }else{
        clearInterval(timestart);
    }
};

// This is for try again button on click then this script work it.
tryBtn.onclick = () =>{
    randomParagraphs()
    inpField.value = '';
    carcIndex = Mistakenow = 0;
    over = true;
    CPM.innerText = 0;
    CpmNow = '';
    Mistakenow = 0;
    Mistakes.innerText = 0; 
    wpnNow = 0;
    WPM.innerText = 0;
    timeleft = maxTime;
    time.innerText = timeleft;
    let TypeingChar = TypingText.querySelectorAll("span");      // This is for get all span value's 
    TypeingChar[carcIndex].classList.add("highLight");      // This is for adding Starting typing word blinking.
    if(!clearInterval(timestart)){
        clearInterval(timestart);
    }
    timernow = false;

};

inpField.addEventListener("input", checkTyping)     // This is for calling and chacking everytime and typing.