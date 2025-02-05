import { Text, View, TouchableOpacity } from "react-native";
import { AddTask, Buttons, ConfirmButton, Container, Content, Description, DescriptionText, Status, TitleText } from "./style";
import { ITasks } from "@/types/ITask";
import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import React from "react";
import { StatusBall } from "../statusBall";
import { useTask } from "@/hooks/task";

export function Task({ id, isNew = false, title, description, status = "Incompleto", onNewTaskPress }: ITasks) {
    const { updateTaskStatus } = useTask();

    async function handleUpdateStatus(newStatus: "Pendente" | "Completado" | "Incompleto") {
        if (id === null) {
            return;
        }
        updateTaskStatus(id, newStatus);
    };

    const formatDate = (date: Date) => date.toLocaleDateString("pt-BR");

    return (
        <Container>
            {isNew === false ? (
                <>
                    <Content>
                        <Description>
                            <TitleText>{title} {id}</TitleText>
                            <DescriptionText>{description}</DescriptionText>
                        </Description>
                        <Buttons>
                            <TouchableOpacity onPress={() => handleUpdateStatus("Completado")}>
                                <ConfirmButton >
                                    <AntDesign name="check" size={20} color="green" />
                                </ConfirmButton>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleUpdateStatus("Incompleto")}>
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
                        <DescriptionText>Data de criação: {formatDate(new Date())}</DescriptionText>
                        <DescriptionText>Data de Expiração: {formatDate(new Date())}</DescriptionText>
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
