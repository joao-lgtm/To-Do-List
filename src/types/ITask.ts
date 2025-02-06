import { DateData } from "react-native-calendars";

export interface ITasks{
    id: number | null;
    isNew?: boolean;
    title?: string;
    description?: string;
    status?: "Pendente" | "Completado" | "Incompleto";
    day?: DateData | null ;
    onNewTaskPress?: () => void;
}