import React, { useEffect, useState } from 'react';
import Column from './Column';
import TaskForm from './TaskForm';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';
import './TaskBoard.css';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editTask, setEditTask] = useState(null);
  const [showDetails, setShowDetails] = useState(null); 
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleTaskMove = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTask(taskId, { status: newStatus });
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleTaskCreate = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskUpdate = async (updatedTask) => {
    try {
      const updated = await updateTask(updatedTask._id, updatedTask);
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? updated : task)));
      setEditTask(null); 
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const columns = {
    todo: filteredTasks.filter((task) => task.status === 'todo'),
    inProgress: filteredTasks.filter((task) => task.status === 'in-progress'),
    done: filteredTasks.filter((task) => task.status === 'done'),
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-board">
        <div className="search-filter-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <Column
          title="To Do"
          tasks={columns.todo}
          status="todo"
          onTaskMove={handleTaskMove}
          onDelete={handleTaskDelete}
          onEdit={setEditTask}          
          onViewDetails={setShowDetails}
        />
        <Column
          title="In Progress"
          tasks={columns.inProgress}
          status="in-progress"
          onTaskMove={handleTaskMove}
          onDelete={handleTaskDelete}
          onEdit={setEditTask}
          onViewDetails={setShowDetails}
        />
        <Column
          title="Done"
          tasks={columns.done}
          status="done"
          onTaskMove={handleTaskMove}
          onDelete={handleTaskDelete}
          onEdit={setEditTask}
          onViewDetails={setShowDetails}
        />
        
        <TaskForm onTaskCreate={handleTaskCreate} />
        
        {editTask && (
          <div className="task-details">
            <h3>Edit Task: {editTask.title}</h3>
            <TaskForm task={editTask} onTaskCreate={handleTaskUpdate} />
            <div className="task-buttons">
              <button onClick={() => handleTaskUpdate(editTask)}>Save</button>
              <button onClick={() => setEditTask(null)}>Cancel</button>
            </div>
          </div>
        )}
        
        {showDetails && (
          <div className="task-details">
            <h3>{showDetails.title}</h3>
            <p><strong>Description:</strong> {showDetails.description}</p>
            <p><strong>Status:</strong> {showDetails.status}</p>
            <p><strong>Created At:</strong> {new Date(showDetails.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(showDetails.updatedAt).toLocaleString()}</p>
            <button onClick={() => setShowDetails(null)}>Close</button>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
