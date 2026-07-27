const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const tasks = [];

function createTaskItem(task, index) {
  const item = document.createElement('li');
  item.className = 'task-item';
  if (task.done) {
    item.classList.add('completed');
  }

  const text = document.createElement('span');
  text.textContent = task.text;
  text.className = 'task-text';
  text.addEventListener('click', () => toggleTaskDone(index));

  const buttons = document.createElement('div');
  buttons.className = 'task-buttons';

  const completeButton = document.createElement('button');
  completeButton.type = 'button';
  completeButton.textContent = task.done ? 'Desfazer' : 'Concluir';
  completeButton.className = 'complete-button';
  completeButton.addEventListener('click', () => toggleTaskDone(index));

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = 'Deletar';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', () => removeTask(index));

  buttons.append(completeButton, deleteButton);
  item.append(text, buttons);
  return item;
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Nenhuma tarefa adicionada ainda.';
    emptyMessage.className = 'empty-message';
    taskList.appendChild(emptyMessage);
    return;
  }

  tasks.forEach((task, index) => {
    const taskItem = createTaskItem(task, index);
    taskList.appendChild(taskItem);
  });
}

function addTask(text) {
  const trimmedText = text.trim();
  if (trimmedText === '') {
    return;
  }

  tasks.push({ text: trimmedText, done: false });
  taskInput.value = '';
  renderTasks();
}

function toggleTaskDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(taskInput.value);
});

renderTasks();
