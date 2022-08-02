let Hr = document.querySelector(".hr");
let Sec = document.querySelector(".sec");
let Min = document.querySelector(".min");


setInterval(() => {
    CurrentTime()
}, 1000);

function CurrentTime(){
    let time = new Date();
    Hour = time.getHours();
    Minutes = time.getMinutes();
    Seconds = time.getSeconds();
    HrNow =  Hour * 30  ;
    MinNow = Minutes * 6;
    SecNow = Seconds * 6;
    console.log(Minutes);
    console.log(HrNow);
    Hr.style.transform = `rotate(${HrNow+(Minutes/2)}deg)`;
    Min.style.transform = `rotate(${MinNow}deg)`;
    Sec.style.transform = `rotate(${SecNow}deg)`;
}

CurrentTime();