let Add_Btn = document.querySelector(".Input_Section button");
let Input = document.querySelector(".Input_Section input");
let Clear_All = document.querySelector(".Footer_Container button");
let Working_List = document.querySelector(".Work_List");
let Padding_Work = document.querySelector(".Footer_Container p span");



// This is plus button working mode
Input.onkeyup = (e) => {
    if(Input.value !== ''){
        Add_Btn.classList.add("Atv_Add_Btn")
    }else{
        Add_Btn.classList.remove("Atv_Add_Btn")
    }

    // This is for enter button on keyboard 
    if(e.keyCode === 13){
        console.log(e.target.value);
        LocalStarge();
        Input.value = '';
        Add_Btn.classList.remove("Atv_Add_Btn")
        
    }

}

// This is for auto focus in Input
document.addEventListener("onload", Input.focus())

// if click on plus botton
Add_Btn.onclick = () => {
    LocalStarge();
    Input.value = '';
    Add_Btn.classList.remove("Atv_Add_Btn")
}

// in this function all localstarge related mathod 
LocalStarge();
function LocalStarge() {
    User_Value = Input.value;
    List_Value = localStorage.getItem("List")
    if(List_Value == null){
        Arr = []
    }else{
        Arr = JSON.parse(List_Value);
    }
    if(User_Value !== ''){
        Arr.push(User_Value)
    }
    localStorage.setItem("List", JSON.stringify(Arr))
    Show_List();
}

// This is for showing Work List 
function Show_List(){
    List_Value = localStorage.getItem("List")
    Arr = JSON.parse(List_Value);
    console.log(Arr)
    Working_List.innerHTML = '';
    Arr.forEach((e , Index) => {
    let Get_List_Value  = `<div class="List">
        <div class="List_Text"><P>${e}</P></div>
        <div onclick="DeleteNow(${Index})"; class="List_Detete"><i class="fas fa-trash-alt"></i></div>
        </div>`
        Working_List.innerHTML += Get_List_Value;
    });
   
    // This for padding works 
    Get_Pedding = Arr.length;
    Padding_Work.innerText = Get_Pedding;
    Delete_Mode()
}


// This is for Delete
function DeleteNow(Index) {
    List_Value = localStorage.getItem("List")
    Arr = JSON.parse(List_Value);
    Arr.splice(Index, 1);
    localStorage.setItem("List", JSON.stringify(Arr));
    Show_List()
    
    console.log('This is working fine');
    Delete_Mode()
}

// This is for clear botton
Clear_All.onclick = () =>{
    localStorage.clear();
    Working_List.innerHTML = '';
    Padding_Work.innerText = 0;
    Delete_Mode()
};

// This is for clear Btn working mode
function Delete_Mode() {
    if(Padding_Work.innerText > 0){
        Clear_All.classList.add("Atv_Delete");
    }else{
        Clear_All.classList.remove("Atv_Delete");
    }
}

