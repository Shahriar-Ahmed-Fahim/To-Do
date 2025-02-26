let taskInput = document.querySelector(".task-input");
let btn = document.querySelector(".task-submit-btn");
let taskList = document.querySelector(".task-list");

let taskListArr = [];
let temp;

btn.addEventListener("click", function(){
    taskList.innerHTML = "";
    temp = taskInput.value;
    taskInput.value = "";
    taskListArr.push(temp);

    for(let i = 0; i < taskListArr.length; i++){
        taskList.innerHTML += `<li> ${taskListArr[i]}<button class="delete">Delete</button></li>`
        let deleteBtn = document.querySelectorAll(".delete");
        let deleteBtnArr = Array.from(deleteBtn);
        for(let j = 0; j < deleteBtnArr.length; j++){
            deleteBtnArr[j].addEventListener('click', function(){
                taskListArr.splice(j, 1);
                taskList.innerHTML = "";
                for(let i = 0; i < taskListArr.length; i++){
                    taskList.innerHTML += `<li> ${taskListArr[i]}<button class="delete">Delete</button></li>`
                }
            })
        }
    }
})