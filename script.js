const openDialogBtn = document.getElementById("openDialogBtn");
const cancelDialogBtn = document.getElementById("cancelDialogBtn");

const taskDialog = document.getElementById("taskDialog");
const taskForm = document.getElementById("taskForm");
const completedTaskList = document.getElementById("completedTaskList");
const uncompletedTaskList = document.getElementById("uncompletedTaskList");

openDialogBtn.addEventListener("click", () => {
    taskDialog.showModal();
});

cancelDialogBtn.addEventListener("click", () => {
    taskDialog.close();
});

function addTask(title, description, assignee) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Assignee: ${assignee}</p>
        <button id="completeBtn">Mark as Completed</button>
        <button id="deleteBtn">Remove</button>
    `;

    const completeBtn = taskItem.querySelector("#completeBtn");
    completeBtn.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        completedTaskList.appendChild(taskItem);
    });

    const deleteBtn = taskItem.querySelector("#deleteBtn");
    deleteBtn.addEventListener("click", () => {
        taskItem.remove();
    });

    uncompletedTaskList.appendChild(taskItem);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const title = taskForm.title.value.trim();
    const description = taskForm.description.value.trim();
    const assignee = taskForm.asignee.value.trim();

    addTask(title, description, assignee);
    taskForm.reset();

    taskDialog.close();

}

taskForm.addEventListener("submit", handleFormSubmit);
