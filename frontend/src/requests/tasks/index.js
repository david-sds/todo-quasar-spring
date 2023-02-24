import { api } from 'src/boot/axios';

async function createTask(task) {
  await api.post('task', task);
}

export {
  createTask,
}