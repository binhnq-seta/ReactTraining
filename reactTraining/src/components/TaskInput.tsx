import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

interface Props {
    onAdd: (title: string, description: string) => void;
}

export default function TaskInput({ onAdd }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title, description);
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid p-fluid p-ai-center p-jc-between">
                <div className="col-12 md:col-8">
                    <InputText
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        className="p-mb-2"
                    />
                    <InputTextarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        rows={3}
                        className="p-mb-2"
                    />
                </div>

                <div className="col-12 md:col-4">
                    <Button type="submit" label="Add Task" icon="pi pi-plus" severity="success" />
                </div>
            </div>
        </form>
    );
}
