// App.tsx
"use client"
import React from 'react';
import BoardContainer from './components/BoardContainer';
import StoreProvider from './storeProvider';
import AddTask from './components/AddTask';

const App: React.FC = () => {
  return (
    <StoreProvider>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Task Manager</h1>
      <AddTask/>
      <BoardContainer />
    </div>
    </StoreProvider>
  );
};

export default App;
