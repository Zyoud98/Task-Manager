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
