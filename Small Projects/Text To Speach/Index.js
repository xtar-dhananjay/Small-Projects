let Input = document.querySelector(".Input_Section textarea");
let Button = document.querySelector("button");
let Select_List = document.querySelector(".Speech_Section Select");



let Synth = speechSynthesis;
let isSpeaking = true;

// This is for get all voice in user divise
function voices(){
    for(let voice of Synth.getVoices()){
        // This is for auto select Google US English
        let selected = voice.name === "Google US English" ? 'Selected' : '';
        let Voice_List = `<option value="${voice.name}" ${selected}>${voice.name}(${voice.lang})</option>`
        Select_List.insertAdjacentHTML("beforeend", Voice_List)
        
    }
}
voices();
Synth.addEventListener("voiceschanged", voices)

// This is function for all mathod of speak 
function SpeachText(){
    Text = Input.value;
    let utternance = new SpeechSynthesisUtterance(Text);
    for(let voice of Synth.getVoices()){
        if(voice.name == Select_List.value){
            utternance.voice = voice;
        }
    }
    Synth.speak(utternance);
}

// if click on Speech Button
Button.onclick = () =>{
    if(Input.value !== ''){
        if(!Synth.speaking){
            SpeachText();
        }
        if(Input.value.length > 80){            
            if(isSpeaking){
                Synth.resume();
                isSpeaking = false;
                Button.innerText = "Pause Speech"
            }else{
                Synth.pause();
                isSpeaking = true;
                Button.innerText = "Resume Speech"
            }

            setInterval(() => {
                if(!Synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    Button.innerText = 'Convert To Speech';
                }
            }, 100);
            
        }
    }
}


