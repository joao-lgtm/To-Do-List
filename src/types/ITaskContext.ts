import { DateData } from "react-native-calendars";
import { ITasks } from "./ITask";

export interface ITaskContext {
    task: ITasks[];
    addTask: (task: ITasks) => void;
    updateTaskStatus: (taskId: number, newStatus: "Pendente" | "Completado" | "Incompleto") => void;
    removeTask: (taskId: number) => void;
    editTask: (taskId: number, newTitle: string, newDescription: string, newday: DateData | null) => void;
}
