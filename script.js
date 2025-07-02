
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskPriority = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");

const editForm = document.getElementById("edit-form");
const editInput = document.getElementById("edit-input");
const editPriority = document.getElementById("edit-priority");
let currentEditIndex = null;

const toast = new bootstrap.Toast(document.getElementById('liveToast'));
const toastMsg = document.getElementById('toast-msg');

function showToast(message) {
  toastMsg.textContent = message;
  toast.show();
}

function getBadgeClass(priority) {
  return priority === "High" ? "danger" :
         priority === "Medium" ? "warning" : "secondary";
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <div>
        <strong>${task.name}</strong>
        <span class="badge bg-${getBadgeClass(task.priority)} ms-2">${task.priority}</span>
      </div>
      <div>
        <button class="btn btn-sm btn-primary me-2" onclick="openEditModal(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const newTask = taskInput.value.trim();
  const priority = taskPriority.value;
  if (newTask === "") return;
  tasks.push({ name: newTask, priority });
  taskInput.value = "";
  saveAndRender("Task added!");
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender("Task deleted!");
}

function openEditModal(index) {
  currentEditIndex = index;
  editInput.value = tasks[index].name;
  editPriority.value = tasks[index].priority;
  new bootstrap.Modal(document.getElementById('editModal')).show();
}

function saveEdit(e) {
  e.preventDefault();
  tasks[currentEditIndex].name = editInput.value.trim();
  tasks[currentEditIndex].priority = editPriority.value;
  bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
  saveAndRender("Task updated!");
}

function saveAndRender(message) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  showToast(message);
}

taskForm.addEventListener("submit", addTask);
editForm.addEventListener("submit", saveEdit);
renderTasks();
