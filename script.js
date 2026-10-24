const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Optional: Prevent default browser behavior
        addTask();
    }
});
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

    totalTasksCreated++;
    increaseProgress();
  }
  taskInput.value = '';
  document.getElementById("progress-bar-container").style.display = "block";
  saveTasks();
}
taskList.addEventListener("click", function(e) {
    const li = e.target.closest("li");
    if (!li || !taskList.contains(li)) return;

    // Delete a task
    if (e.target.tagName === "SPAN") {
        if (!li.classList.contains("checked")) {
            totalTasksCreated--;
        }
        li.remove();
        increaseProgress();
        saveTasks();
        return;
    }

    // Complete a task only once
    if (e.target.tagName === "LI" &&
        !li.classList.contains("checked")) {
        li.classList.add("checked");
        completedTasks++;
        increaseProgress();
        saveTasks();

        setTimeout(() => {
            li.classList.add("fade-out");
            setTimeout(() => {
                li.remove();
                saveTasks();
            }, 400);
        }, 300);
    }
});
function saveTasks() {
    localStorage.setItem("task", taskList.innerHTML);
    localStorage.setItem("totalTasksCreated", totalTasksCreated);
    localStorage.setItem("completedTasks", completedTasks);
}
function loadTasks() {
    taskList.innerHTML = localStorage.getItem("task") || "";
    totalTasksCreated = Number(
        localStorage.getItem("totalTasksCreated")
    );
    completedTasks = Number(
        localStorage.getItem("completedTasks")
    );
    // Fallback if saved counters do not exist
    if (localStorage.getItem("totalTasksCreated") === null) {
        totalTasksCreated = taskList.querySelectorAll("li").length;
    }
    if (localStorage.getItem("completedTasks") === null) {
        completedTasks =
            taskList.querySelectorAll("li.checked").length;
    }
    increaseProgress();
}
const progressBar = document.getElementById('progress');
let currentProgress = 0;
let totalTasksCreated = 0;
let completedTasks = 0;
function increaseProgress() {
    const progressMessage = document.getElementById("progressMessage");
    currentProgress = totalTasksCreated === 0 ? 0 : (completedTasks / totalTasksCreated) * 100;
    progressBar.style.width = currentProgress + '%';
    if (totalTasksCreated > 0 && completedTasks >= totalTasksCreated) {
        progressMessage.textContent =
            "Congratulations! You have completed all your tasks!";
        // Wait before resetting everything
        setTimeout(() => {
            taskList.innerHTML = "";
            taskInput.value = "";
            currentProgress = 0;
            totalTasksCreated = 0;
            completedTasks = 0;
            progressBar.style.width = "0%";
            document.getElementById("progress-bar-container").style.display = "none";
            localStorage.removeItem("task");
            localStorage.removeItem("totalTasksCreated");
            localStorage.removeItem("completedTasks");
            progressMessage.textContent = "";
        }, 2200);
        return;
    }
    progressMessage.textContent = "";
}
loadTasks();