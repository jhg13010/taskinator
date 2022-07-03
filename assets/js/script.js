var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

/* function getTask(callback) {
    var task = prompt("Enter Task Name");
    callback(addTask);
} */

function addTask() {
    var listItemEL = document.createElement("li");
    listItemEL.className = "task-item";
    listItemEL.textContent = "new task";
    tasksToDoEl.appendChild(listItemEL);
}

buttonEl.addEventListener("click", addTask) 

/*feature/form-submit
    - create task via form and indicate type of task
    - submit form via button or enter 
    - prevent empty form fields from submitting 
To Do: 
    - create feature 
    - add HTML 
    - handle form submission 
    - capture form values
    - organize functionality
    - address usability
    - save with Git 
*/ 