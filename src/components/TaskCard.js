import React from 'react';
import { useDrag } from 'react-dnd';
import './TaskCard.css';

const TaskCard = ({ task, onDelete, onEdit, onViewDetails }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { _id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      ref={drag}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div className="task-buttons">
        <button onClick={() => onEdit(task)}>Edit</button>&nbsp;&nbsp;
        <button onClick={() => onViewDetails(task)}>SeeMore</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
