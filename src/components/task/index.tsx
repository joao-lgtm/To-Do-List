import { Text, View, TouchableOpacity } from "react-native";
import { AddTask, Buttons, ConfirmButton, Container, Content, Description, DescriptionText, Status, TitleText } from "./style";
import { ITasks } from "@/types/ITask";
import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import React from "react";
import { StatusBall } from "../statusBall";
import { useTask } from "@/hooks/task";
import { DateData } from "react-native-calendars";

export function Task({ id, isNew = false, title, description, status = "Incompleto", day, onNewTaskPress }: ITasks) {
    const { updateTaskStatus, removeTask } = useTask();

    async function handleUpdateStatus(newStatus: "Pendente" | "Completado" | "Incompleto") {
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

    const formatDate = (dates: DateData | undefined) => {
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
                            <TouchableOpacity onPress={() => handleUpdateStatus("Completado")}>
                                <ConfirmButton >
                                    <AntDesign name="check" size={20} color="green" />
                                </ConfirmButton>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleRemoveTask()}>
                                <ConfirmButton>
                                    <AntDesign name="close" size={20} color="red" />
                                </ConfirmButton>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleUpdateStatus("Pendente")}>
                                <ConfirmButton >
                                    <Entypo name="clock" size={24} color="black" />
                                </ConfirmButton>
                            </TouchableOpacity>
                        </Buttons>
                    </Content>
                    <View>
                        <Status>
                            <DescriptionText>Status: {status} <StatusBall status={status} /></DescriptionText>
                        </Status>
                        <DescriptionText>Data de Expiração: {formatDate(day)}</DescriptionText>
                    </View>
                </>
            ) : (
                <AddTask onPress={onNewTaskPress}>
                    <Octicons name="plus" size={24} color="white" />
                </AddTask>
            )}
        </Container>
    );
}