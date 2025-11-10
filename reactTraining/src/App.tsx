import { useState, useEffect } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import { Button } from "primereact/button";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string) => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t =>
    filter === "active" ? !t.completed :
      filter === "completed" ? t.completed : true
  );

  return (
    <div className="app-container">
      <h1>Personal Task Manager</h1>

      <TaskInput onAdd={addTask} />

      <div className="filter-buttons">
        <Button onClick={() => setFilter("all")} label="All" outlined />
        <Button onClick={() => setFilter("active")} severity="warning" label="Active" outlined/>
        <Button onClick={() => setFilter("completed")} severity="success" label="Completed" outlined />
      </div>

      <TaskList tasks={filteredTasks} onToggle={toggleComplete} onDelete={deleteTask} />
      <TaskStats tasks={tasks} />
    </div>
  );
}

export default App;
