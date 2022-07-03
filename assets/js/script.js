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
