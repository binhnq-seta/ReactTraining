import type { Task } from "../types/Task";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Card } from "primereact/card";

interface Props {
    tasks: Task[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
    if (tasks.length === 0)
        return <p className="p-text-center p-mt-3">No tasks found.</p>;

    return (
        <div className="p-mt-4">
            {tasks.map((task) => (
                <Card key={task.id} className="p-mb-3 task-card">
                    <div className="p-d-flex p-jc-between p-ai-center">
                        <div className="task-content">
                            <Checkbox
                                checked={task.completed}
                                onChange={() => onToggle(task.id)}
                            />
                            <div>
                                <div
                                    style={{
                                        textDecoration: task.completed ? "line-through" : "none",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {task.title}
                                </div>
                                {task.description && (
                                    <small style={{ color: "#666" }}>{task.description}</small>
                                )}
                            </div>
                        </div>

                        <Button
                            icon="pi pi-trash"
                            rounded
                            text
                            severity="danger"
                            onClick={() => onDelete(task.id)}
                        />
                    </div>
                </Card>
            ))}
        </div>
    );
}
