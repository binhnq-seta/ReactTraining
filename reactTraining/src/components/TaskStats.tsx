import type { Task } from "../types/Task";
import { ProgressBar } from "primereact/progressbar";

interface Props {
  tasks: Task[];
}

export default function TaskStats({ tasks }: Props) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="p-mt-4">
      <h3>Progress</h3>
      <ProgressBar value={percent} showValue />
      <p className="p-text-center p-mt-2">
        {completed}/{total} tasks completed
      </p>
    </div>
  );
}
