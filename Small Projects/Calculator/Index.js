let Buttons = document.querySelectorAll("button")
let Input = document.querySelector(".Container input")
let DEL = document.querySelector(".del")
// console.log(Input);

// if click any button on calulrator
Buttons.forEach(e =>{
    e.addEventListener("click", ()=>{
        
        if(e.innerText == 'X'){
            Input.value += '*';

        }else if(e.innerText == '='){
            Input.value = eval(Input.value)

        }else if(e.innerText == 'C'){
            Input.value = '';

        }else{
            Delete();           // Recall Delete function for backspace Button
            Input.value += e.innerText;

        }
    });
});

// if click on backspace Button
let Delete = () =>{
    DEL.onclick = () =>{
        Input.value = Input.value.slice(0, -1)
    }
}