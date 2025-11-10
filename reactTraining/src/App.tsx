import { useEffect, useState } from "react";
import type { Task } from "./types/Task";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./App.css";

type Filter = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="card">
      <Card title="Personal Task Manager">
        <TaskInput onAdd={addTask} />

        <div className="p-d-flex p-jc-center p-mt-3 p-gap-2">
          <Button
            label="All"
            severity={filter === "all" ? "info" : "secondary"}
            onClick={() => setFilter("all")}
          />
          <Button
            label="Active"
            severity={filter === "active" ? "info" : "secondary"}
            onClick={() => setFilter("active")}
          />
          <Button
            label="Completed"
            severity={filter === "completed" ? "info" : "secondary"}
            onClick={() => setFilter("completed")}
          />
        </div>

        <TaskList tasks={filteredTasks} onToggle={toggleComplete} onDelete={deleteTask} />
        <TaskStats tasks={tasks} />
      </Card>
    </div>
  );
}

export default App;