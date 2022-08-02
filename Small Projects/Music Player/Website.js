

Audio retaed function in javascript

1. in Buil function in javascript
    Audio.Pause();
    Audio.play();
    Audio.pause();

2. Events
    Audio.onended();
    Audio.ontimeupdate();
    Audio.currentTime();
    Audio.duration();
    Audio.onloadeddata();


3. Mathod for currentTime and duration diffine in seconds and minuts

Audio.addEventListener('loadeddata', ()=>{

    let {currentTime, duration} = (Audio.srcElement);
    let Current_Min = Math.floor(currentTime / 60);
    let Current_Sec = Math.floor(currentTime % 60);
    let Duration_Min = Math.floor(duration / 60);
    let Duration_Sec = Math.floor(duration % 60);

    // This is for value on best form in cornvert like this 3:05;
    if(Duration_Sec < 10){
        Duration.Span.innerText = `${Duration_Min}:0${Duration_Sec}`

    }else{
        Duration.Span.innerText = `${Duration_Min}:${Duration_Sec}`
    }
    if(Current_Sec < 10){
        Current_Span.innerText = `${Current_Min}:0${Current_Sec}`
    }else{
        Current_Span.innerText = `${Current_Min}:${Current_Sec}`
    }

});