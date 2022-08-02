let Button = document.querySelector("button");      // This for getting Button

// This is for click to Button then take's this actinos
Button.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
        console.log(navigator.geolocation);
        Button.innerText = "Allow For Your Location";
        
    }else{
        Button.innerText = "Your Browser Not Support";
    }

})

function onSuccess(Location){
    Button.innerText = "Detecting Your Loaction...";
    console.log(Location);
    let latitude = Location.coords.latitude;
    let longitude = Location.coords.longitude;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c6b1d701a51e4340a015ba60a6f0cd7f`)
    .then(Response => Response.json()).then(result => {
        console.log(result);
        let {postcode, suburb, state, country} = result.results[0].components;
        if(suburb !== undefined){       // This is For Fair Fox Browser
            Button.innerText =  suburb + ", " + state + ", " + country; 
        }else{                          // This is For Chrome Browser
            Button.innerText =  postcode + ", " + state + ", " + country 
        }
        
        Button.setAttribute("disabled", "true");
    })
}


function onError(Error){
    if(Error.code == 1){
        Button.innerText = "Your are Denied Parmition"; 

    }else if(Error.code == 2){
        console.log("Your Denied Parmition")

    }else{
        console.log("Some Time Error This not Support");
    }
}