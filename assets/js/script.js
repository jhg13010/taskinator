//connect js to HTML forms and ul
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//create functin to handle form submission

function taskFormHandler(event) {
    //stop page refresh 
    event.preventDefault();
    
    //connect js to form inputs
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //validate inputs 
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    //reset form
    formEl.reset();

    //convert data to an object 
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
    };

    createTaskEl(taskDataObj);
};

function createTaskEl(taskDataObj) {
    //create list elements 
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    //create div element within list element to enable 2 headings 
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //apply html content to div element to enable 2 headings 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    //append div to li and li to ul
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
}


//call form on form submission (click or enter)
formEl.addEventListener("submit", taskFormHandler);




/*feature/form-submit
    - create task via form and indicate type of task
    - submit form via button or enter 
    - prevent empty form fields from submitting 
To Do: 
    - create feature ==> DONE
    - add HTML ==> DONE
    - handle form submission ==> DONE
    - capture form values ==> DONE
    - organize functionality
    - address usability
    - save with Git 
*/ 