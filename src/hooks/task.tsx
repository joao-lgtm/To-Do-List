import { ITasks } from "@/types/ITask";
import { createContext, ReactNode, useContext, useState } from "react";

interface ITaskContext {
    task: ITasks[];
    addTask: (task: ITasks) => void;
    updateTaskStatus: (taskId: number, newStatus: "Pendente" | "Completado" | "Incompleto") => void;
}


export const TaskContext = createContext({} as ITaskContext);

interface ITaskProviderProps {
    children: ReactNode;
}


export function TaskProvider({ children }: ITaskProviderProps) {
    const [task, setTask] = useState<ITasks[]>([
        { id: 1, title: "Comprar pão", description: "Ir à padaria pela manhã", status: "Completado" },
        { id: 2, title: "Estudar React Native", description: "Finalizar módulo 3 do curso", status: "Pendente" }
    ]);

    async function addTask({ id, title, description, status }: ITasks) {
        const newTask: ITasks = { id, title, description, status };
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

    return (
        <TaskContext.Provider value={{ task, addTask ,updateTaskStatus}}>
            {children}
        </TaskContext.Provider>
    )
}


export function useTask() {
    const context = useContext(TaskContext);
    return context;
}