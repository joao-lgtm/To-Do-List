import { Modal, TouchableOpacity, View } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Background, Buttons, Container, styles } from "./styles";
import { useState } from "react";
import { ptBR } from "@/utils/localeCalendarConfig";
import { Text } from "react-native";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface CalendarsProps {
    calendarVisible: boolean;
    onClose: () => void;
    day?: DateData | null;
    setDay: React.Dispatch<React.SetStateAction<DateData | null>>;
}

export function Calendars({ calendarVisible, onClose, day, setDay }: CalendarsProps) {

    async function handleAddDay() {
        if (!day) {
            return;
        }
        onClose();
    }

    return (
        <Modal animationType="fade" transparent={true} visible={calendarVisible} onRequestClose={onClose}>
            <Background>
                <Container>
                    <Calendar
                        style={styles.calendar}
                        headerStyle={{
                            borderBottomWidth: 0.5,
                            borderBottomColor: "#E8E8E8",
                            paddingBottom: 10,
                            marginBottom: 10
                        }}
                        theme={{
                            textMonthFontSize: 18,
                            monthTextColor: "#ffffff",
                            textMonthFontWeight: "bold",
                            todayTextColor: "#F06543",
                            selectedDayBackgroundColor: "#F06543",
                            selectedDayTextColor: "#FFF",
                            arrowColor: "#F06543",
                            calendarBackground: "#FFF",
                        }}
                        minDate={new Date().toISOString().split('T')[0]}
                        onDayPress={(day: DateData) => setDay(day)}
                        markedDates={day ? {
                            [day.dateString]: { selected: true, selectedColor: "#F06543" }
                        } : {}}
                    />

                    <Buttons>
                        <TouchableOpacity onPress={onClose} style={{
                            marginTop: 20,
                            backgroundColor: "red",
                            padding: 10,
                            borderRadius: 5,
                        }}>
                            <Text style={{ color: "white" }}>Fechar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleAddDay} style={{
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
