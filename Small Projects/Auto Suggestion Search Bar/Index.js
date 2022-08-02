let Input = document.querySelector(".Input_Container input")
let Button = document.querySelector(".Input_Container .icon")
let Suggestion_Box = document.querySelector(".Suggestion_Box")

Input.onkeyup = (e) =>{
    userData = e.target.value;  
    let Empy_Array = [];
    if(userData){
        Empy_Array = Suggestion.filter((data)=>{
            return data.toLocaleUpperCase().startsWith(userData.toLocaleUpperCase());
        });
        Empy_Array = Empy_Array.map((data)=>{
            return `<li>${data}</li>`
        });
        if(!Empy_Array.length){
            Empy_Array.push(`<li>${userData}</li>`);
            console.log("hii");
        }
        let element = '';
        for (let i = 0; i < Empy_Array.length; i++) {
            element += Empy_Array[i];
        }
        
        Suggestion_Box.innerHTML = element;
        let li_List = document.querySelectorAll("li");
        for (let i = 0; i < li_List.length; i++) {
            li_List[i].setAttribute("onclick", "select(this)");
            // element += Empy_Array[i];
        }
        Suggestion_Box.classList.add('active')
    }else{

        Suggestion_Box.classList.remove('active')
    }
};

function select(e){
    Input.value = e.textContent;
    Suggestion_Box.classList.remove('active')
};

Button.addEventListener("click", ()=>{
    window.open("https://www.google.com/search?q="+Input.value,'_blank');
    Input.value = '';
    Suggestion_Box.classList.remove('active')
    
});