import { Text, View, TouchableOpacity } from "react-native";
import { AddTask, Buttons, ConfirmButton, Container, Content, Description, StatusText, Status, TitleText, DescriptionText, Info } from "./style";
import { ITasks } from "@/types/ITask";
import { AntDesign, Entypo, Octicons, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StatusBall } from "../statusBall";
import { useTask } from "@/hooks/task";
import { DateData } from "react-native-calendars";
import { TaskModal } from "../Taskmodal";

export function Task({ id, isNew = false, title, description, status = "Pendente", day, onNewTaskPress }: ITasks) {
    const { updateTaskStatus, removeTask } = useTask();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<ITasks | null>(null);

    async function handleUpdateStatus(newStatus: "Pendente" | "Completo") {
        if (id === null) {
            return;
        }
        updateTaskStatus(id, newStatus);
    };

    async function handleRemoveTask() {
        if (id === null) {
            return;
        }
        removeTask(id);
    }

    const formatDate = (dates: DateData | null | undefined) => {
        if (!dates) return "Nenhuma data selecionada";
        const { day, month, year } = dates;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    return (
        <Container>
            {isNew === false ? (
                <>
                    <Content>
                        <Description>
                            <TitleText>{title}</TitleText>
                            <DescriptionText>{description}</DescriptionText>
                        </Description>
                        <Buttons>
                            {status !== "Completo" && (
                                <>
                                    <TouchableOpacity onPress={() => handleUpdateStatus("Completo")}>
                                        <ConfirmButton>
                                            <AntDesign name="check" size={20} color="green" />
                                        </ConfirmButton>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setSelectedTask({ id, title, description, status, day });
                                        setModalVisible(true);
                                    }}>
                                        <ConfirmButton>
                                            <AntDesign name="edit" size={24} color="black" />
                                        </ConfirmButton>
                                    </TouchableOpacity>
                                </>
                            )}
                            <TouchableOpacity onPress={handleRemoveTask}>
                                <ConfirmButton>
                                    <Feather name="trash-2" size={24} color="red" />
                                </ConfirmButton>
                            </TouchableOpacity>
                            {status !== "Pendente" && (
                                <TouchableOpacity onPress={() => handleUpdateStatus("Pendente")}>
                                    <ConfirmButton>
                                        <Entypo name="clock" size={24} color="black" />
                                    </ConfirmButton>
                                </TouchableOpacity>
                            )}
                        </Buttons>
                    </Content>

                    <Info>
                        <Status status={status}>
                            <StatusText status={status}> {status} </StatusText><StatusBall status={status} />
                        </Status>
                        <View>
                            <DescriptionText>Finalizar até: {formatDate(day)}</DescriptionText>
                        </View>
                    </Info>
                </>
            ) : (
                <AddTask onPress={onNewTaskPress}>
                    <Octicons name="plus" size={24} color="white" />
                </AddTask>
            )}

            <TaskModal
                titleModal="Editar Tarefa"
                type="Edit"
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                task={selectedTask}
            />
        </Container>
    );
}
