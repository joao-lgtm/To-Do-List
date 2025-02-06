import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Background, Buttons, Container, ContentData, DataContainer, TextGeneric, TextTitle } from "./styles";
import { Input } from "../input";
import { useTask } from "@/hooks/task";
import { ITasks } from "@/types/ITask";
import { Calendars } from "../calendar";
import { DateData } from "react-native-calendars";
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { theme } from "@/styles/theme";

interface AddTaskModalProps {
    titleModal: string;
    visible: boolean;
    onClose: () => void;
    type: "Add" | "Edit";
    task?: ITasks | null;
}

export function AddTaskModal({ titleModal, visible, onClose, type, task }: AddTaskModalProps) {
    const { addTask, editTask } = useTask();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [day, setDay] = useState<DateData | null>(null);

    useEffect(() => {
        if (type === "Edit" && task) {
            setTitle(task.title ?? "");
            setDescription(task.description ?? "");
            setDay(task.day ?? null);
        } else {
            setTitle("");
            setDescription("");
            setDay(null);
        }
    }, [visible, task]);

    const handleAddTask = () => {
        if (!title.trim() || !description.trim()) return;

        const newTask: ITasks = {
            id: Date.now(),
            title,
            description,
            status: "Pendente",
            day: day ?? undefined,
        };

        addTask(newTask);
        onClose();
    };

    const handleEditTask = () => {
        if (!task || task.id == null) return;

        editTask(task.id, title, description, day);
        onClose();
    };

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <Background>
                <Container>
                    <TextTitle>{titleModal}</TextTitle>

                    <Input>
                        <Input.Field
                            placeholder="Digite o nome da tarefa"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </Input>

                    <Input>
                        <Input.Field
                            placeholder="Digite a descrição da tarefa"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </Input>

                    <DataContainer>
                        <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                            <View>
                                {day ? (
                                    <ContentData>
                                        <TextGeneric>
                                            Data Selecionada: {`${day.day}/${day.month}/${day.year}`}
                                        </TextGeneric>
                                        <AntDesign name="calendar" size={24} color={theme.colors.gray_800} />
                                    </ContentData>
                                ) : (
                                    <ContentData>
                                        <TextGeneric>Selecione uma data :</TextGeneric>
                                        <AntDesign name="calendar" size={24} color={theme.colors.gray_800} />
                                    </ContentData>
                                )}
                            </View>
                        </TouchableOpacity>

                        <Calendars
                            calendarVisible={calendarVisible}
                            setDay={setDay}
                            day={day}
                            onClose={() => setCalendarVisible(false)}
                        />
                    </DataContainer>

                    <Buttons>
                        <TouchableOpacity onPress={onClose} style={{
                            marginTop: 20,
                            backgroundColor: "red",
                            padding: 10,
                            borderRadius: 5,
                        }}>
                            <Text style={{ color: "white" }}>Fechar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={type === "Add" ? handleAddTask : handleEditTask}
                            style={{
                                marginTop: 20,
                                backgroundColor: type === "Add" ? "green" : "blue",
                                padding: 10,
                                borderRadius: 5,
                            }}
                        >
                            <Text style={{ color: "white" }}>{type === "Add" ? "Adicionar" : "Salvar"}</Text>
                        </TouchableOpacity>
                    </Buttons>
                </Container>
            </Background>
        </Modal>
    );
}
