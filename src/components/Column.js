import React from 'react';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd'; 
import './Column.css';

const Column = ({ title, tasks, status, onTaskMove, onDelete, onEdit, onViewDetails }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.status !== status) {
        onTaskMove(item._id, status);
      }
    },
  });

  return (
    <div className="column" ref={drop}>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}        
          onViewDetails={onViewDetails}  
        />
      ))}
    </div>
  );
};

export default Column;
