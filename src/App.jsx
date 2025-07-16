import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
import { TaskList } from './components/TaskList';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;