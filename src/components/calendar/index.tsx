import { Modal, TouchableOpacity, View } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Background, ButtonAdd, ButtonCancel, Buttons, Container, styles, TextAdd, TextCancel } from "./styles";
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
                        hideExtraDays={true}
                        minDate={new Date().toISOString().split('T')[0]}
                        onDayPress={(day: DateData) => setDay(day)}
                        markedDates={day ? {
                            [day.dateString]: { selected: true, selectedColor: "#F06543" }
                        } : {}}
                    />

                    <Buttons>
                        <TouchableOpacity onPress={onClose}>
                            <ButtonCancel>
                                <TextCancel>Fechar</TextCancel>
                            </ButtonCancel>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleAddDay}>
                            <ButtonAdd>
                                <TextAdd>Adicionar</TextAdd>
                            </ButtonAdd>
                        </TouchableOpacity>
                    </Buttons>
                </Container>
            </Background>
        </Modal>
    );
}
