const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
function addTask() {
  if(taskInput.value === '')
  {
    alert("Please enter a task.");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = taskInput.value;
    taskList.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00D7";
    li.appendChild(span);
  }
  taskInput.value = '';
  saveTasks();
}
taskList.addEventListener("click", function(e)
{
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTasks();
    }
}, false);
function saveTasks() {
    localStorage.setItem("task", taskList.innerHTML);
}
function loadTasks() {
    taskList.innerHTML = localStorage.getItem("task");
}
loadTasks();