import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { Task } from "@/components/task";
import { AddTaskModal } from "@/components/modal";
import { useTask } from "@/hooks/task";
import { ActiveTab, Container, TabButton, TabsContainer, TabText } from "./styles";
import React from "react";

export default function Index() {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<"Todos" | "Pendente" | "Completos">("Todos");
    const { task } = useTask();

    const filteredTasks = task?.filter((t) => {
        if (activeTab === "Pendente") return t.status === "Pendente";
        if (activeTab === "Completos") return t.status === "Completado";
        return true;
    });

    const totalTodos = task.length;
    const totalPendente = task.filter(t => t.status === "Pendente").length;
    const totalCompletado = task.filter(t => t.status === "Completado").length;

    const tabs = [
        { name: "Todos", total: totalTodos },
        { name: "Pendente", total: totalPendente },
        { name: "Completos", total: totalCompletado },
    ];



    return (
        <Container>
            <Text>Todo List</Text>
            <TabsContainer>
                {tabs.map(({ name, total }) => (
                    <TabButton
                        key={name}
                        onPress={() => setActiveTab(name as "Todos" | "Pendente" | "Completos")}
                    >
                        <ActiveTab isActive={activeTab === name}>
                            <TabText isActive={activeTab === name}>
                                {name} ({total})
                            </TabText>
                        </ActiveTab>
                    </TabButton>
                ))}
            </TabsContainer>
            <FlatList
                data={filteredTasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Task
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        status={item.status}
                        day={item.day}
                    />
                )}
                ListFooterComponent={
                    <Task id={null} isNew onNewTaskPress={() => setModalVisible(true)} />
                }
            />
            <AddTaskModal titleModal={"Adicionar Nova Tarefa"} type={"Add"} visible={modalVisible} onClose={() => setModalVisible(false)} />
        </Container>
    );
}

 