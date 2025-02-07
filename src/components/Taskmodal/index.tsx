import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Background, ButtonAdd, ButtonCancel, Buttons, Container, ContentData, DataContainer, TextAdd, TextCancel, TextData, TextGeneric, TextTitle } from "./styles";
import { Input } from "../input";
import { useTask } from "@/hooks/task";
import { ITasks } from "@/types/ITask";
import { Calendars } from "../calendar";
import { DateData } from "react-native-calendars";
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { theme } from "@/styles/theme";
import { TaskModalProps } from "@/types/IModal";

export function TaskModal({ titleModal, visible, onClose, type, task }: TaskModalProps) {
    const { addTask, editTask } = useTask();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [day, setDay] = useState<DateData | null>(null);
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

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

    const validateFields = () => {
        let isValid = true;
        if (!title.trim()) {
            setTitleError(true);
            isValid = false;
        } else {
            setTitleError(false);
        }

        if (!description.trim()) {
            setDescriptionError(true);
            isValid = false;
        } else {
            setDescriptionError(false);
        }

        return isValid;
    };

    const handleAddTask = () => {
        if (!validateFields()) return;

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
        if (!validateFields() || !task || task.id == null) return;

        editTask(task.id, title, description, day);
        onClose();
    };

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <Background>
                <Container>
                    <TextTitle>{titleModal}</TextTitle>
                    <Input error={titleError}>
                        <Input.Field
                            placeholder="Digite o nome da tarefa"
                            value={title}
                            onChangeText={setTitle}
                        />
                        {titleError && <Text style={{ color: "red", fontSize: 12 }}>Este campo é obrigatório</Text>}
                    </Input>

                    <Input error={descriptionError}>
                        <Input.Field
                            placeholder="Digite a descrição da tarefa"
                            value={description}
                            onChangeText={setDescription}
                            multiline={true}
                            numberOfLines={4}
                        />
                        {descriptionError && <Text style={{ color: "red", fontSize: 12 }}>Este campo é obrigatório</Text>}
                    </Input>

                    <DataContainer>
                        <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                            <View>
                                {day ? (
                                    <ContentData>
                                        <TextGeneric>
                                            Data Selecionada:</TextGeneric>
                                        <TextData> {`${day.day}/${day.month}/${day.year}`}</TextData>

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
                        <TouchableOpacity onPress={onClose}>
                            <ButtonCancel>
                                <TextCancel>Cancelar</TextCancel>
                            </ButtonCancel>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={type === "Add" ? handleAddTask : handleEditTask}>
                            <ButtonAdd>
                                <TextAdd>{type === "Add" ? "Adicionar" : "Salvar"}</TextAdd>
                            </ButtonAdd>
                        </TouchableOpacity>
                    </Buttons>
                </Container>
            </Background>
        </Modal>
    );
}
