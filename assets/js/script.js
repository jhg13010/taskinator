var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskInput = document.querySelector("#task-name");

/* function getTask(callback) {
    var task = prompt("Enter Task Name");
    callback(addTask);
} */

function createTaskHandler(event) {
    event.preventDefault();
    var listItemEL = document.createElement("li");
    listItemEL.className = "task-item";
    listItemEL.textContent = "test"; //taskInput.value;
    tasksToDoEl.appendChild(listItemEL);
}

formEl.addEventListener("click", createTaskHandler) 

/*feature/form-submit
    - create task via form and indicate type of task
    - submit form via button or enter 
    - prevent empty form fields from submitting 
To Do: 
    - create feature ==> DONE
    - add HTML ==> DONE
    - handle form submission 
    - capture form values
    - organize functionality
    - address usability
    - save with Git 
*/ 