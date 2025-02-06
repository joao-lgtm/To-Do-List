import { ITasks } from "./ITask";

export interface TaskModalProps {
    titleModal: string;
    visible: boolean;
    onClose: () => void;
    type: "Add" | "Edit";
    task?: ITasks | null;
}
