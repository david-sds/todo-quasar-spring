import { api } from 'src/boot/axios';

async function fetchTasks() {
  const response = await api.get('task');

  return response?.data;
}

async function saveTask(task) {
  await api.post('task', task);
}

async function deleteTask(taskId) {
  await api.delete(`task/${taskId}`)
}

export {
  fetchTasks,
  saveTask,
  deleteTask
}