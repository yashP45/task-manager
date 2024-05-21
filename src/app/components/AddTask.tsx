import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../lib/taskSlice';

const AddTask: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() !== '') {
      dispatch(addTask(taskTitle.trim()));
      setTaskTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-4">
      <input
        type="text"
        value={taskTitle}
        onChange={e => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
        className="mr-2 p-2 border rounded text-black"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
