let NewBtn = document.querySelector(".features button");
let QuateText = document.querySelector(".content .Quate .QuateText");
let Author = document.querySelector(".content .author span");
let SpeechBtn = document.querySelector(".SpeekeBtn");
let CopyBtn = document.querySelector(".CopyBtn");
let TwitterBtn = document.querySelector(".TwitterBtn");

NewBtn.addEventListener("click", randomQuate)
function randomQuate(){
    NewBtn.classList.add("Loding")
    NewBtn.innerText = "Loding...";
    fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(result => {
        let {author, content} = result;
        QuateText.textContent = content;
        Author.innerText = author;
        NewBtn.innerText = "New Quate";
        NewBtn.classList.remove("Loding")

    })
};
randomQuate();


// This is for Twitt 
TwitterBtn.addEventListener("click", Twitt)
function Twitt(){
    let TwittUrl = `https://twitter.com/intent/tweet?url=${QuateText.innerText}`
    window.open(TwittUrl, "_blank")    
}

// This is for Speak Quotes
SpeechBtn.addEventListener("click", SpeechNow)
function SpeechNow(){
    let speakNow = new SpeechSynthesisUtterance(`${QuateText.innerText} By ${Author.innerText}`)
    speechSynthesis.speak(speakNow)
}

// This is for copy Quotes
CopyBtn.addEventListener("click", copy)
function copy(){
    navigator.clipboard.writeText(QuateText.innerText);
}