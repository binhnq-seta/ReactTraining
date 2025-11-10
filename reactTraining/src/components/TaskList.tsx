import type { Task } from "../App";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => {
  if (tasks.length === 0) return <p className="empty">No tasks to show.</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          <div onClick={() => onToggle(task.id)} className="task-info">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
          </div>
          <button className="delete-btn" onClick={() => onDelete(task.id)}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
