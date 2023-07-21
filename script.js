const OpenDialogBtn = document.getElementById("OpenDialogBtn");
const CancelDialogBtn = document.getElementById("CancelDialogBtn");

const TaskDialog = document.getElementById("TaskDialog");
const TaskForm = document.getElementById("TaskForm");
const CompletedTaskList = document.getElementById("CompletedTaskList");
const UncompletedTaskList= document.getElementById("UncompletedTaskList");

OpenDialogBtn.addEventListener("click", () =>
{
    TaskDialog.showModal();
});
CancelDialogBtn.addEventListener("click", () =>
{
    TaskDialog.close();

});