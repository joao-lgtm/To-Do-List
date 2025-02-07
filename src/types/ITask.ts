import { DateData } from "react-native-calendars";

export interface ITasks{
    id: number | null;
    isNew?: boolean;
    title?: string;
    description?: string;
    status?: "Pendente" | "Completo";
    day?: DateData | null ;
    onNewTaskPress?: () => void;
}