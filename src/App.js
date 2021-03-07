import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      setTasks(await fetchTasks());
    }
    getTasks();
  }, []);
  
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    return await res.json();
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    return await res.json();
  };

  const updateTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return await res.json();
  };

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    setTasks([...tasks, await res.json()]);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });

    setTasks(tasks.filter(task => task.id !== id));
  }

  const toggleReminder = async (id) => {
    let task = await fetchTask(id);
    task.reminder = !task.reminder;
    task = await updateTask(task);
    setTasks(tasks.map((x) => x.id === id ? task : x));
  }

  return (
    <div className="container">
      <Header showAdd={showAddTask} onAdd={() => setShowAddTask(!showAddTask)} title="Task Tracker"/>
      {showAddTask && <AddTask onAddTask={addTask}/>}
      {tasks.length > 0 ? <Tasks onToggle={toggleReminder} onDelete={deleteTask} tasks={tasks}></Tasks> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
