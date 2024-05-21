import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  title: string;
  stage: 'not_started' | 'in_progress' | 'completed';
}

interface TasksState {
  tasks: Task[];
}

const loadTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState: TasksState = {
  tasks: loadTasks(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: state.tasks.length + 1,
        title: action.payload,
        stage: 'not_started',
      };
      state.tasks.push(newTask);
      saveTasks(state.tasks);
    },
    toggleTaskCompletion: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.stage = task.stage === 'completed' ? 'not_started' : 'completed';
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    updateTaskStage: (state, action: PayloadAction<{ taskId: number; stage: 'not_started' | 'in_progress' | 'completed' }>) => {
      const { taskId, stage } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.stage = stage;
        saveTasks(state.tasks);
      }
    },
  },
});

export const { addTask, toggleTaskCompletion, deleteTask, updateTaskStage } = tasksSlice.actions;
export default tasksSlice.reducer;
