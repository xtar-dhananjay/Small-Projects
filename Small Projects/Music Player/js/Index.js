let img = document.querySelector(".Img img");
let Audio = document.querySelector(".Img audio");
let Next_Btn = document.querySelector(".Next");
let Prev = document.querySelector(".Prev");
let Names = document.querySelector(".Names");
let Songs = document.querySelector(".Img");
let Puse_Resu = document.querySelector(".Puse_Resu");
let Resu_Icon = document.querySelector(".Puse_Resu span");
let Progras = document.querySelector(".Progras_Bar .Progras");
let Progras_Bar = document.querySelector(".Progras_Bar");
let Progras_Section = document.querySelector(".Progras_Section");
let Total_Time = document.querySelector(".Duration");
let Current_AudTime = document.querySelector(".Current");
let Plya_List = document.querySelector(".Plya_List ul");
let Plya_List_Tag = document.querySelector(".Plya_List");
let Play_List_Icon = document.querySelector(".Play_List_Icon");
let Close_PlyaList = document.querySelector(".Close");

// get values
let Count_Songs = 0;
let Play_Now = true;
let Show_Playing_Icon = false;

// set dufault song
window.onload = ()=>{
    Get_Names =  `<div class="Song_Name">${Song_List[Count_Songs].Name}</div>
                  <div class="Song_Artist">${Song_List[Count_Songs].Artist}</div>`
    Names.innerHTML = Get_Names;
    img.src = `Img/${Song_List[Count_Songs].Img}.png`
    Audio.src = `Music/${Song_List[Count_Songs].Song_Name}.mp3`
    Play_List();
    
};

// Next Btn
Next_Btn.onclick = ()=>{
    if(Count_Songs < Song_List.length-1){
        Count_Songs++;
        Get_Names =  `<div class="Song_Name">${Song_List[Count_Songs].Name}</div>
        <div class="Song_Artist">${Song_List[Count_Songs].Artist}</div>`
        Names.innerHTML = Get_Names;
        img.src = `Img/${Song_List[Count_Songs].Img}.png`
        Audio.src = `Music/${Song_List[Count_Songs].Song_Name}.mp3`
        Pause_Now()
    }
    Playing()
};

// Prev Btn
Prev.onclick = ()=>{
    if(Count_Songs > 0){
        Count_Songs--;
        Get_Names =  `<div class="Song_Name">${Song_List[Count_Songs].Name}</div>
                    <div class="Song_Artist">${Song_List[Count_Songs].Artist}</div>`
        Names.innerHTML = Get_Names;
        img.src = `Img/${Song_List[Count_Songs].Img}.png`
        Audio.src = `Music/${Song_List[Count_Songs].Song_Name}.mp3`
        Pause_Now()
    }
    Playing()
};


// make it puse and play function

Puse_Resu.onclick = () =>{
    if(Play_Now){
        Pause_Now()
    }else{
        Audio.pause()
        Play_Now = true;
        Show_Playing_Icon = true
        Resu_Icon.innerText = "play_arrow"
    }
    Playing()
};

// This is for puse Btn function
function Pause_Now(){
    Audio.play();
    Play_Now = false;
    // Show_Playing_Icon = true;
    Resu_Icon.innerText = "pause"
}

Audio.addEventListener('timeupdate', (event) => {
    // Progars Bar
    let {currentTime, duration} = (event.srcElement);
    let Prog_Width = (currentTime / duration * 100); 
    Progras.style.width = `${Prog_Width}%`
    
    // This is for show currentTime and duration
    if(duration){
        let Current_AudTime_Min = Math.floor(currentTime / 60);
        let Current_AudTime_Sec = Math.floor(currentTime % 60);
        let Total_Time_Min = Math.floor(duration / 60);
        let Total_Time_Sec = Math.floor(duration % 60);
        if(Total_Time_Sec < 10){
            Total_Time.innerText = `${Total_Time_Min}:0${Total_Time_Sec}`

        }else{
            Total_Time.innerText = `${Total_Time_Min}:${Total_Time_Sec}`
        }
        if(Current_AudTime_Sec < 10){
            Current_AudTime.innerText = `${Current_AudTime_Min}:0${Current_AudTime_Sec}`
        }else{
            Current_AudTime.innerText = `${Current_AudTime_Min}:${Current_AudTime_Sec}`
        }
    }
    

});


// This is for click clicking on prograss than update audio and audio time
Progras_Bar.onclick = (event) =>{
    let {duration} = Audio;
    let offsetX = event.offsetX
    let clientWidth = Progras_Bar.clientWidth
    Audio.currentTime = ( offsetX / clientWidth ) * duration ;
    Pause_Now();
    Playing()
    Show_Playing_Icon = false
};

// if click on Play List Icon
Play_List_Icon.addEventListener("click", ()=>{
    Plya_List_Tag.classList.add("active")
})

// if click on Play List Close Icon
Close_PlyaList.addEventListener("click", ()=>{
    Plya_List_Tag.classList.remove("active")
})


// adding all song on play list
function Play_List(){
    for (let i = 0; i < Song_List.length; i++) {
        Get_All_Songs = `   <li Index="${i+1}">
                                <div class="Details">
                                    <div class="PSong_Name">${Song_List[i].Name}</div>
                                    <p class="PArtist_Name">${Song_List[i].Artist}</p>
                                </div>
                                <audio class="${Song_List[i].Song_Name}" src="Music/${Song_List[i].Song_Name}.mp3"></audio>
                                <div class="PSong_Time${i} Sec">3:00</div>
                            </li>` 
        Plya_List.insertAdjacentHTML("beforeend", Get_All_Songs);
        let PSong_Time = Plya_List.querySelector(`.PSong_Time${i}`);
        let Audio_duration = Plya_List.querySelector(`.Music${i+1}`);
        Audio_duration.addEventListener("loadeddata", ()=>{
            get_Dura = Audio_duration.duration;
            let Min = Math.floor(get_Dura / 60);
            let Sec = Math.floor(get_Dura % 60);
            if(Sec < 10){
                PSong_Time.innerText = `${Min}:0${Sec}`
                PSong_Time.setAttribute('Dur', `${Min}:0${Sec}`)

            }else{
                PSong_Time.innerText = `${Min}:${Sec}`
                PSong_Time.setAttribute('Dur', `${Min}:${Sec}`)
            }
        });
    }
    Playing()
}

function Playing(){
    let LI_Tag = document.querySelectorAll(".Plya_List li")
    for (let i = 0; i < LI_Tag.length; i++) {
        
        let Dur = LI_Tag[i].querySelector(".Sec").getAttribute('Dur')
        LI_Tag[i].querySelector(".Sec").innerText = Dur;
        // remov LiActive class form li tag 
        let Li_Ga = LI_Tag[i].getAttribute("Index")
        LI_Tag[i].classList.remove("LiActive");

        // if li index equal to Count_Songs Play song 
        if((Li_Ga - 1) == Count_Songs){
            LI_Tag[i].classList.add("LiActive");            // add LiActive class fram li tag for fight light current song
            LI_Tag[i].querySelector(".Sec").innerHTML = `<span class="material-icons">graphic_eq</span>`;       // This is for play icon on play list

            if(Show_Playing_Icon){            // show playing icon according to pause and play
                let Dur = LI_Tag[i].querySelector(".Sec").getAttribute('Dur')
                LI_Tag[i].querySelector(".Sec").innerText = Dur;
                Show_Playing_Icon = false
            }
            else{
                LI_Tag[i].querySelector(".Sec").innerHTML = `<span class="material-icons">graphic_eq</span>`;
            }
        }

        // set click event on all li tag 
        LI_Tag[i].setAttribute("onclick", "clicked(this)")
    }
}


function clicked(This){
    let li_Index = (This.getAttribute('Index') - 1)
    Count_Songs = li_Index;
    Get_Names =  `<div class="Song_Name">${Song_List[Count_Songs].Name}</div>
                  <div class="Song_Artist">${Song_List[Count_Songs].Artist}</div>`
    Names.innerHTML = Get_Names;
    img.src = `Img/${Song_List[Count_Songs].Img}.png`
    Audio.src = `Music/${Song_List[Count_Songs].Song_Name}.mp3`
    Pause_Now();
    Show_Playing_Icon = false
    Playing()
}

// let Repeat_Btn = document.querySelector(".Music_Mode")
let Repeat_Btn = document.querySelector(".Music_Mode span")
Repeat_Btn.addEventListener("click", ()=>{
    let Get_Text = Repeat_Btn.innerText;
    switch(Get_Text){
        case "repeat":
            Repeat_Btn.innerText = "repeat_one";
            Repeat_Btn.setAttribute("title", "Song Looped")
            break
        case "repeat_one":
            Repeat_Btn.innerText = "shuffle";
            Repeat_Btn.setAttribute("title", "Play Back shuffle")
            break
        case "shuffle":
            Repeat_Btn.innerText = "repeat";
            Repeat_Btn.setAttribute("title", "PlayList Looped")
            break
    }
});

// if Audio ended 
Audio.addEventListener("ended", ()=>{
    let Get_Text = Repeat_Btn.innerText;
    switch(Get_Text){
        case "repeat":
            Next_Btn.click();
            break
        case "repeat_one":
            Audio.currentTime = 0;
            Audio.play();
            break
        case "shuffle":
            let shuffle_Mode = Math.floor(Math.random() * Song_List.length)
            if(shuffle_Mode == Song_List.length){
                shuffle_Mode = 1
            }
            Count_Songs = shuffle_Mode;
            Get_Names =  `<div class="Song_Name">${Song_List[Count_Songs].Name}</div>
                        <div class="Song_Artist">${Song_List[Count_Songs].Artist}</div>`
            Names.innerHTML = Get_Names;
            img.src = `Img/${Song_List[Count_Songs].Img}.png`
            Audio.src = `Music/${Song_List[Count_Songs].Song_Name}.mp3`
            Pause_Now();
            Show_Playing_Icon = false
            Playing()
            break
    }
});

