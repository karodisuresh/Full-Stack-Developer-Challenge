import React, { useEffect, useState } from "react";
import TaskBoard from "./TaskBoard";
import { fetchTasks } from "../api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetchTasks(token);
      setTasks(response);
    };
    fetchData();
  }, []);

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <h1>Task Dashboard</h1>
        <TaskBoard tasks={tasks} />
      </DndProvider>
    </div>
  );
};

export default Dashboard;
