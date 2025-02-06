import { ITasks } from "@/types/ITask";
import { ITaskContext } from "@/types/ITaskContext";
import { createContext, ReactNode, useContext, useState } from "react";



export const TaskContext = createContext({} as ITaskContext);

interface ITaskProviderProps {
    children: ReactNode;
}


export function TaskProvider({ children }: ITaskProviderProps) {
    const [task, setTask] = useState<ITasks[]>([
        { id: 1, title: "Comprar pão", description: "Ir à padaria pela manhã", status: "Completado" },
        { id: 2, title: "Estudar React Native", description: "Finalizar módulo 3 do curso", status: "Pendente" }
    ]);

    async function addTask({ id, title, description, status, day }: ITasks) {
        const newTask: ITasks = { id, title, description, status, day};
        setTask([...task, newTask]);
        // Salvar no storage
        //...
    }

    async function updateTaskStatus(taskId: number, newStatus: "Pendente" | "Completado" | "Incompleto") {
        const updatedTasks = task.map(t =>
            t.id === taskId ? { ...t, status: newStatus } : t
        );

        setTask(updatedTasks);
    }


    async function removeTask(taskId: number) {
        const updatedTasks = task.filter(t => t.id !== taskId);
        setTask(updatedTasks);
    }

    async function editTask(taskId: number, newTitle: string, newDescription: string) {
        const updatedTasks = task.map(t =>
            t.id === taskId ? { ...t, title: newTitle, description: newDescription } : t
        );
        setTask(updatedTasks);
    }

    return (
        <TaskContext.Provider value={{ task, addTask, updateTaskStatus, removeTask, editTask }}>
            {children}
        </TaskContext.Provider>
    )
}


export function useTask() {
    const context = useContext(TaskContext);
    return context;
}