//connect js to HTML forms and ul
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//create functin to handle form submission
var createTaskHandler = function(event) {
    //stop page refresh 
    event.preventDefault();
    
    //connect js to form inputs
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //create list elements 
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    //create div element within list element to enable 2 headings 
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //apply html content to div element to enable 2 headings 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    //append div to li and li to ul
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
};

//call form on form submission (click or enter)
formEl.addEventListener("submit", createTaskHandler);

/*feature/form-submit
    - create task via form and indicate type of task
    - submit form via button or enter 
    - prevent empty form fields from submitting 
To Do: 
    - create feature ==> DONE
    - add HTML ==> DONE
    - handle form submission ==> DONE
    - capture form values
    - organize functionality
    - address usability
    - save with Git 
*/ 