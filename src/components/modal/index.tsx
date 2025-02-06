import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Background, Buttons, Container } from "./styles";
import { Input } from "../input";
import { useTask } from "@/hooks/task";
import { ITasks } from "@/types/ITask";
import { Calendars } from "../calendar";
import { DateData } from "react-native-calendars";

export function AddTaskModal({ visible, onClose }: AddTaskModalProps) {
    const { addTask } = useTask();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [day, setDay] = useState<DateData | null>(null);



    const handleAddTask = () => {
        if (!title.trim() || !description.trim()) {
            return;
        }
    
        const newTask: ITasks = {
            id: Date.now(),
            title,
            description,
            status: "Pendente",
            day: day ?? undefined, 
        };
    
        addTask(newTask);
        setTitle("");
        setDescription("");
        setDay(null);
        onClose();
    };


    useEffect(() => {
        if (!visible) {
            setDay(null);
        }
    }, [visible]);

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <Background>
                <Container>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Adicionar Nova Tarefa</Text>

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

                    <View>
                        <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                            <Text>Selecionar Data: {day ? `${day.day}/${day.month}/${day.year}` : ""}</Text>

                        </TouchableOpacity>

                        <Calendars
                            calendarVisible={calendarVisible}
                            setDay={setDay}
                            day={day}
                            onClose={() => setCalendarVisible(false)}
                        />
                    </View>

                    <Buttons>
                        <TouchableOpacity onPress={onClose} style={{
                            marginTop: 20,
                            backgroundColor: "red",
                            padding: 10,
                            borderRadius: 5,
                        }}>
                            <Text style={{ color: "white" }}>Fechar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleAddTask} style={{
                            marginTop: 20,
                            backgroundColor: "green",
                            padding: 10,
                            borderRadius: 5,
                        }}>
                            <Text style={{ color: "white" }}>Adicionar</Text>
                        </TouchableOpacity>
                    </Buttons>
                </Container>
            </Background>
        </Modal>
    );
}
