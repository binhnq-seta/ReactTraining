import type { Task } from "../App";

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stats">
      <p>Total: {total}</p>
      <p>Completed: {completed}</p>
      <p>Progress: {percent}%</p>
    </div>
  );
};

export default TaskStats;
