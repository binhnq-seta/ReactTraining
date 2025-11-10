import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

interface TaskInputProps {
  onAdd: (title: string, description: string) => void;
}

const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(title, desc);
    setTitle("");
    setDesc("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <InputText
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputTextarea
        placeholder="Description (optional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={3}
        autoResize
      />
      <Button label="Add" />
    </form>
  );
};

export default TaskInput;
