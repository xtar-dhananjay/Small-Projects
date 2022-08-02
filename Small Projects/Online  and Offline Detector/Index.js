let MainContainer = document.querySelector(".Container");
let Close = document.querySelector(".close");
let WI_FI = document.querySelector(".WI-FI");
let Sutitile = document.querySelector(".sutitile");
let Title= document.querySelector(".title");

function CheckNow(){
    if(navigator.onLine){
        WI_FI.innerHTML = '<i class="uil uil-wifi"></i>';
        Title.innerText = "You're online now";
        Sutitile.innerText = "hurray! connected to Internet";
        MainContainer.classList.add("WiFIConnected");
        setTimeout(() => {
            MainContainer.style.left = "-65%";
        }, 5000);
    }else{
        MainContainer.classList.remove("WiFIConnected");
        MainContainer.style.left = "10px";
        WI_FI.innerHTML = '<i class="uil uil-wifi-slash"></i>';
        Title.innerText = "You're offline now";
        Sutitile.innerText = "Oops! Internet is disconnected";
    }
}

Close.onclick = () => {
    MainContainer.style.left = "-65%";
}

let now = setInterval(() => {
    CheckNow();
}, 1000);   


