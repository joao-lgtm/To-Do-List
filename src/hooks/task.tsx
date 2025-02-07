import { ITasks } from "@/types/ITask";
import { ITaskContext } from "@/types/ITaskContext";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { DateData } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/services/api";
import { APITask } from "@/types/IAPITask";

export const TaskContext = createContext({} as ITaskContext);

interface ITaskProviderProps {
    children: ReactNode;
}


const TASKS_STORAGE_KEY = "@tasks";
const FIRST_TIME_KEY = "@firstTimeUser";

export function TaskProvider({ children }: ITaskProviderProps) {
    const [task, setTask] = useState<ITasks[]>([]);

    async function fetchTasksFromAPI() {
        try {
            const response = await api.get<APITask[]>("todos");
            const apiTasks: ITasks[] = response.data.slice(0, 5).map((task) => ({
                id: task.id,
                title: task.title,
                description: "Descrição genérica",
                status: task.completed ? "Completado" : "Pendente",
                day: null,
            }));

            setTask(apiTasks);
            await saveTasksToStorage(apiTasks);
            await AsyncStorage.setItem(FIRST_TIME_KEY, "true");
        } catch (error) {
            console.error("Erro ao buscar tarefas da API:", error);
        }
    }

    async function loadTasksFromStorage() {
        try {
            const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
            if (storedTasks) {
                setTask(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error);
        }
    }

    useEffect(() => {
        async function initializeTasks() {
            const isFirstTime = await AsyncStorage.getItem(FIRST_TIME_KEY);
            if (!isFirstTime) {
                await fetchTasksFromAPI();
            } else {
                await loadTasksFromStorage();
            }
        }

        initializeTasks();
    }, []);

    async function saveTasksToStorage(updatedTasks: ITasks[]) {
        try {
            await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
        } catch (error) {
            console.error("Erro ao salvar tarefas:", error);
        }
    }

    async function addTask({ id, title, description, status, day }: ITasks) {
        const newTask: ITasks = { id, title, description, status, day };
        const updatedTasks = [...task, newTask];

        setTask(updatedTasks);
        await saveTasksToStorage(updatedTasks);
    }

    async function updateTaskStatus(taskId: number, newStatus: "Pendente" | "Completado") {
        const updatedTasks = task.map(t =>
            t.id === taskId ? { ...t, status: newStatus } : t
        );

        setTask(updatedTasks);
        await saveTasksToStorage(updatedTasks);
    }

    async function removeTask(taskId: number) {
        const updatedTasks = task.filter(t => t.id !== taskId);
        setTask(updatedTasks);
        await saveTasksToStorage(updatedTasks);
    }

    async function editTask(taskId: number, newTitle: string, newDescription: string, newday: DateData | null) {
        const updatedTasks = task.map(t =>
            t.id === taskId ? { ...t, title: newTitle, description: newDescription, day: newday } : t
        );

        setTask(updatedTasks);
        await saveTasksToStorage(updatedTasks);
    }

    return (
        <TaskContext.Provider value={{ task, addTask, updateTaskStatus, removeTask, editTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTask() {
    const context = useContext(TaskContext);
    return context;
}
