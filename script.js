const openDialogBtn = document.getElementById("openDialogBtn");
const cancelDialogBtn = document.getElementById("cancelDialogBtn");

const taskDialog = document.getElementById("taskDialog");
const taskForm = document.getElementById("taskForm");
const completedTaskList = document.getElementById("completedTaskList");
const uncompletedTaskList = document.getElementById("uncompletedTaskList");

const helpBtn = document.getElementById("help");
const cancelHelpBtn = document.getElementById("cancelHelp");
helpDialog = document.getElementById("helpDialog");

helpBtn.addEventListener("click", () =>
{
    helpDialog.showModal();
});
helpDialog.addEventListener("submit", () =>
{
    helpDialog.close();
});
cancelHelpBtn.addEventListener("click", () =>
{
    helpDialog.close();
});


openDialogBtn.addEventListener("click", () => {
    taskDialog.showModal();
});

cancelDialogBtn.addEventListener("click", () => {
    taskDialog.close();
});

function saveTasks(tasks){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getTasks(){
    return JSON.parse(localStorage.getItem("tasks")) || [];
}
function addTask(title, description, assignee) {
    const task = {
      title: title,
      description: description,
      assignee: assignee,
      completed: false,
    };
  
    const tasks = getTasks();
    tasks.push(task);
  
    saveTasks(tasks);
  }
  function markTaskCompleted(taskId) {
    const tasks = getTasks();
    tasks[taskId].completed = true;
  
    saveTasks(tasks);
  }

  function displayTasks() {
    const tasks = getTasks();
  
    uncompletedTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';
  
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = "task";
        taskItem.innerHTML = `
          <h3>${task.title}</h3>
          <p class="description">${task.description}</p>
          <p><b>Assignee:</b> ${task.assignee}</p>
          <button class="deleteBtn" data-taskid="${index}">Delete</button>
        `;
      
        if (task.completed) {
          taskItem.classList.add("completed");
        } else {

          taskItem.innerHTML += `
            <button class="completeBtn" data-taskid="${index}">Mark Completed</button>

          `;
      
          const completeBtn = taskItem.querySelector(".completeBtn");
          completeBtn.addEventListener("click", () => {
            const taskId = parseInt(completeBtn.getAttribute("data-taskid"));
            markTaskCompleted(taskId);
            displayTasks();
          });
      

        }
        const deleteBtn = taskItem.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => {
          const taskId = parseInt(deleteBtn.getAttribute("data-taskid"));
          tasks.splice(taskId, 1);
          saveTasks(tasks);
          displayTasks();
        });
      
        if (task.completed) {
          completedTaskList.appendChild(taskItem);
        } else {
          uncompletedTaskList.appendChild(taskItem);
        }
      });
      
  }

  function handleFormSubmit(event) {
    event.preventDefault();
  
    const title = taskForm.title.value.trim();
    const description = taskForm.description.value.trim();
    const assignee = taskForm.assignee.value.trim();
  
    addTask(title, description, assignee);
    taskForm.reset();
  
    taskDialog.close();
  
    displayTasks();
  }
  
  taskForm.addEventListener("submit", handleFormSubmit);
  
  displayTasks();
