//task id incrementer
var taskIdCounter = 0;
//connect js to HTML forms and ul
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// tasks array 
var tasks = [];

//function to handle form submission
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

    //identifies new or edit tasks via presense of task ID
    var isEdit = formEl.hasAttribute("data-task-id");
    
    //has data attribute ==> get ID and call function to edi 
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }

    //no data attribute ==> new task 
    //convert data to an object 
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
    }
};

function createTaskEl(taskDataObj) {
    console.log(taskDataObj);
    console.log(taskDataObj.status);
  
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

    //store task ID into task array variable 
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    //increase data id counter
    taskIdCounter++;

    saveTasks();
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

function completeEditTask(taskName, taskType, taskId) {
    //find task selected
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //assign the new values 
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    //alert user
    alert("Task Updated!");

    //reset form and task ID
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    saveTasks();
}

//function to find button IDs prior to edit or delete
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

    var updatedTaskArr = [];

    for (var i = 0; i < tasks.length; i++) {
        //if task[i].id doesn't match value of taskId, keep it via pushing to new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign tasks array to the updated tasks array
    tasks = updatedTaskArr;
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

//
function taskStatusChangeHandler(event) {
    //get items ID
    var taskId = event.target.getAttribute("data-task-id");

    //get current value of select option
    var statusValue = event.target.value.toLowerCase();

    //find parent task item element based on id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //movement conditions 
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    };

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    } 

    saveTasks();
};

//save tasks to localStorage wheneve change/addition occurs 
function saveTasks () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//call form on form submission (click or enter)
formEl.addEventListener("submit", taskFormHandler);

//handler to utilize bubbling to delete/edit specific events 
pageContentEl.addEventListener("click", taskButtonHandler);

//listener for status changes for kanban use
pageContentEl.addEventListener("change", taskStatusChangeHandler);


/*feature/form-submit
    - create task via form and indicate type of task
    - submit form via button or enter 
    - prevent empty form fields from submitting 
    To Do: 
        - create feature ==> DONE
        - add HTML ==> DONE
        - handle form submission ==> DONE
        - capture form values ==> DONE
        - organize functionality ==> DONE
        - address usability ==> DONE
        - save with Git ==> DONE
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
        - ability to delete ==> Delete ==> DONE
        - load task form for editing ==> DONE
        - move tasks by status ==> DONE
        - save with git ==> DONE    
*/

/* feature/optimization
    - restructure to use localStorage
    To Do: 
        - create feature ==> DONE
        - save tasks to an array ==> DONE
        - save to localStorage
        - load from localStorage
        - optimize code
        - save with git 
*/