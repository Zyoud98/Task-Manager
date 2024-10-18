let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = function() {
  renderTasks();
};

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const statusInput = document.getElementById('statusInput');
  const taskText = taskInput.value.trim();
  const description = descriptionInput.value.trim();
  const status = statusInput.value;

  if (taskText !== '') {
    const newTask = {
      id: Math.random().toString(4).slice(2),
      text: taskText,
      description: description,
      status: status,
      completed: status === 'completed'
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = '';
    descriptionInput.value = '';
    statusInput.value = 'pending';
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filteredTasks = tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  filteredTasks.forEach((task) => {
    const card = document.createElement('div');
    card.classList.add('task-card', task.status);
    if (task.completed) {
      card.classList.add('completed'); 
    }
    
    card.innerHTML = `
      <div class="task-content">
        <button class="toggle-btn" onclick="toggleComplete('${task.id}')">${task.completed ? '&check;' : '&#8987;'}</button>
        <div class="task-details">
          <span class="task-text" title="${task.text}">${task.text}</span>
          <p class="task-description" title="${task.description}">${task.description}</p>
          <p class="task-status">${task.status} </p>
          <p class="task-id">ID: ${task.id}</p>
        </div>
      </div>
      <div class="task-actions">
        <button class="update-btn" onclick="updateTask('${task.id}')">Update</button>
        <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
      </div>
    `;

    taskList.appendChild(card);
  });
}

function toggleComplete(taskId) {
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      const newStatus = task.completed ? 'pending' : 'completed';
      return { ...task, completed: !task.completed, status: newStatus };
    }
    return task;
  });
  saveTasks();
  renderTasks();
}

function updateTask(taskId) {
  const taskToUpdate = tasks.find(task => task.id === taskId);
  
  // Create a modal for updating task
  const modal = document.createElement('div');
  modal.classList.add('update-modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Update Task</h2>
      <p >Task name</p>
      <input type="text" id="updateTaskName" value="${taskToUpdate.text}" placeholder="Task Name">
      <p >Description </p>
      <textarea id="updateTaskDescription" placeholder="Task Description">${taskToUpdate.description}</textarea>
      <div class="modal-actions">
        <button onclick="saveTaskUpdate('${taskId}')">Save</button>
        <button onclick="closeUpdateModal()">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function saveTaskUpdate(taskId) {
  const newTaskText = document.getElementById('updateTaskName').value.trim();
  const newDescription = document.getElementById('updateTaskDescription').value.trim();
  
  if (newTaskText !== '') {
    tasks = tasks.map(task => {
      if (task.id === taskId) {
        return { 
          ...task, 
          text: newTaskText,
          description: newDescription
        };
      }
      return task;
    });
    saveTasks();
    renderTasks();
    closeUpdateModal();
  }
}

function closeUpdateModal() {
  const modal = document.querySelector('.update-modal');
  if (modal) {
    modal.remove();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
}

function searchTasks() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchInput) );
  renderTasks(filteredTasks);
}

function selectTask() {
  const selectInput = document.getElementById('selectInput');
  const taskId = selectInput.value.trim();
  const selectedTask = tasks.find(task => task.id === taskId);
  
  if (selectedTask) {
    renderTasks([selectedTask]);
  } else {
    alert('Task not found');
    renderTasks();
  }
  
  selectInput.value = '';
}

function clearSearch() {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const searchInput = document.getElementById('searchInput');
  const selectInput = document.getElementById('selectInput');
  if (searchInput) searchInput.value = '';
  if (selectInput) selectInput.value = '';
  renderTasks();
  const clearButton = document.getElementById('clearButton');
  clearButton.textContent = 'Cleared!';
  setTimeout(() => {
    clearButton.textContent = 'Clear Search';
  }, 1000);
}
