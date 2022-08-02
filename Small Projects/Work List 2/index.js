                // discribe all html tag, id and class's
    var input = document.querySelector("#container input");
    var add = document.querySelector("#container button");
    var todo = document.querySelector("#list");
    var pandding = document.querySelector("#paddingtask");
    var clearAll = document.querySelector("#footer button");


        // this is for add Button Effects
    input.onkeyup = ()=> {  
        userData = input.value      // Storuser value in userData 
        if(userData != 0){  // if input in enter value then
            add.classList.add("active");
        }else{              // if input in not enter value then
            add.classList.remove("active");
        };
    }


    // Sand in localStorage items
    add.onclick = () => {       // if click on add button then
        userData = input.value;
        taskData = localStorage.getItem("tasks")
        if(taskData == null){
            arr = [];
        }else{
            arr = JSON.parse(taskData);
        };
        arr.push(userData);
        localStorage.setItem("tasks",JSON.stringify(arr)) // sand complete items in localStorage
        input.value = '';
        
        add.classList.remove("active");
        showTasks();
    };

    // showTasks
    function showTasks (){
        userData = input.value;
        taskData = localStorage.getItem("tasks")
        if(taskData == null){
            arr = [];
        }else{
            arr = JSON.parse(taskData);
        };
        localStorage.setItem("tasks",JSON.stringify(arr)) // sand complete items in localStorage

        var task = '';
        arr.forEach((element, index)=> {    
            task+= `<li>${element}<span id="del" onclick="deletetask(${index})"><i class="fas fa-trash" id="icon2"></i></span> </li>`;
        });
        todo.innerHTML = task;
        pandding.textContent = arr.length;
 
        // clearAll Button Effects
        if(arr.length>0){
            clearAll.classList.add("vvactive");
        }else{
            clearAll.classList.remove("vvactive");
        };
    };

    // delete items
    function deletetask(index){     // if click on delete button then
        taskData = localStorage.getItem("tasks")
            arr = JSON.parse(taskData);
        arr.splice(index,1)     // arr delete parmiters
        localStorage.setItem("tasks",JSON.stringify(arr)) // sand complete items in localStorage
        showTasks();    // update list
    }

    // Clear all
    clearAll.onclick = ()=>{    // click on clearAll Button than
        if(confirm("Are you really want to remove list.")){
            localStorage.clear("tasks")     // clear localStorage
            showTasks();    // update list
        }
    };

    showTasks();

