import { IStatus } from "./IStatus";


export interface ITasks{
    id: number | null;
    isNew?: boolean;
    title?: string;
    description?: string;
    status?: "Pendente" | "Completado" | "Incompleto";
    onNewTaskPress?: () => void;
}