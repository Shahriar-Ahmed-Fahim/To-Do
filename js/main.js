let taskInput = document.querySelector(".task-input");
let btn = document.querySelector(".task-submit-btn");
let updateBtn = document.querySelector(".task-update-btn");
let taskList = document.querySelector(".task-list");

let taskListArr = [];
let updateIndex;
let className;

let color = ['red', 'green', 'blue'];

btn.addEventListener("click", function(){
    if (taskInput.value.trim() === "") return;
    taskList.innerHTML = "";
    taskListArr.push(taskInput.value);
    taskInput.value = "";
    display();
})

function display(){
    for(let i = 0; i < taskListArr.length; i++){
        let className = isNaN(taskListArr[i]) ? "type" : "counter";
        taskList.innerHTML += `<li> <span class="${className}">${taskListArr[i]}</span> <button class="edit">Edit</button> <button class="delete">Delete</button></li>`
        let editBtn = document.querySelectorAll(".edit");
        let editBtnArr = Array.from(editBtn);
        let deleteBtn = document.querySelectorAll(".delete");
        let deleteBtnArr = Array.from(deleteBtn);


        for(let j = 0; j < deleteBtnArr.length; j++){
            deleteBtnArr[j].addEventListener('click', function(){
                taskListArr.splice(j, 1);
                taskList.innerHTML = "";
                display();
            })
        }
        for(let j = 0; j < editBtnArr.length; j++){
            editBtnArr[j].addEventListener('click', function(){
                taskInput.value = taskListArr[j];
                updateBtn.classList.remove("d-none");
                btn.classList.add("d-none");
                updateIndex = j;
            })
        }
    }

    let counters = taskList.querySelectorAll('.counter');
    counters.forEach(counter => applyCounter(counter));

    let types = taskList.querySelectorAll(".type");
    types.forEach(type => applyType(type));


}

updateBtn.addEventListener("click", function(){
    taskListArr[updateIndex] = taskInput.value;
    taskInput.value = "";
    taskList.innerHTML = "";
    btn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    display();
})



function applyCounter(item){
    let counterNum = item.innerHTML;
    let counterStart = 0;
    item.innerHTML = `<span style="color:${color[0]}">${counterStart}</span>`;
    
    function count(){
        counterStart++;
        item.innerHTML = `<span style="color:${color[counterStart%3]}">${counterStart}</span>`;
        if(counterNum == counterStart){
            clearInterval(counterInterval);
         }
    }

    let counterInterval = setInterval(()=>{
        count();
    }, 500);
}


function applyType(item){
    let typeText = item.innerHTML;
    let textArr = typeText.split("");
    textArr = textArr.map((item, index) => `<span style="color:${color[index%3]}">${item}</span>`);
    console.log(textArr);
    item.innerHTML = "";
    let typeCountStart = 0;

    function typeJs(){
        if(typeCountStart < textArr.length){
            item.innerHTML += `<span style="color:${color[typeCountStart%3]}">${typeText[typeCountStart]}<span>`;
            typeCountStart++;
            
        }else{
            textArr.pop();
            item.innerHTML = textArr.join("");
            if(textArr.length == 0){
                typeCountStart = 0;
                textArr = typeText.split("");
                textArr = textArr.map((item, index) => `<span style="color:${color[index%3]}">${item}</span>`);
            }
        }
    }

    setInterval(()=>{
        typeJs();
    }, 300)
}