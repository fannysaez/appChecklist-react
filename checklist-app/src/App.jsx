import { useState } from 'react';
import AddTask from './assets/components/AddTask/AddTask';
import TaskList from './assets/components/TaskList/TaskList';
import EditTask from './assets/components/EditTask/EditTask';
import DeleteTask from './assets/components/DeleteTask/DeleteTask';
import './assets/styles/globals.css';
import './assets/styles/variables.css';


function App() {
  // ...existing code...
  return (
    <div className="main-center">
      <div className="app-container">
        <h1>Ma Checklist</h1>
        <TaskList />
      </div>
    </div>
  );
}

export default App;
