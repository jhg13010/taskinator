//task id incrementer
var taskIdCounter = 0;
//connect js to HTML forms and ul
var pageContentEl = document.querySelector("#page-content");
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

    //add data id for incrementing
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    
    //create div element within list element to enable 2 headings 
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //apply html content to div element to enable 2 headings 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    //append div to li and li to ul
    listItemEl.appendChild(taskInfoEl);

    //add the actions to the task 
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //append the task to the list 
    tasksToDoEl.appendChild(listItemEl);

    //increase data id counter
    taskIdCounter++;
};

function createTaskActions(taskId) {
    //create div element with identifying class
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //craete delete button
    var deleteButtonEl =  document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i=0; i < statusChoices.length; i++) {
        //create option element 
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    };

    return actionContainerEl;
};

//call form on form submission (click or enter)
formEl.addEventListener("submit", taskFormHandler);

//function to find button IDs prior to delete
function taskButtonHandler(event) {
   //get target element 
   var targetEl = event.target;
   
   //edit button click
   if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
   } 
    // delete button click
    else if (event.target.matches(".delete-btn")) {
        //get element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    };
};

//function to execute delete 
function deleteTask(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

//function to execute edit 
function editTask(taskId) {
    console.log("editing task#" + taskId);

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("#save-task").textContent = "Save Task";
    document.querySelector("input[name='task-name']").value = taskName
    document.querySelector("select[name='task-type']").value = taskType
    formEl.setAttribute("data-task-id", taskId);
};


//utilize bubbling to delete specific events via main content 
pageContentEl.addEventListener("click", taskButtonHandler);



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

/* feature/update-tasks
    - set default status
    - change of status in dropdown will move task to appropriate column
    - edit and delete button
    - edit button will change to save task 
    - delete task removes entireley 
    To Do: 
        - create feature ==> DONE
        - create HTML lists ==> DONE
        - apply unique id to each task ==> DONE 
        - create dynamic task buttons  ==> DONE
        - ability to delete ==> Delete
        - load task form for editing
        - move tasks by status
        - save with git
*/