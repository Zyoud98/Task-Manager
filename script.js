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
