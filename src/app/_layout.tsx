import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import {
    useFonts,
    Ubuntu_700Bold,
    Ubuntu_500Medium,
    Ubuntu_400Regular
} from "@expo-google-fonts/ubuntu";
import { Loading } from "@/components/loading/styles";
import { theme } from "@/styles/theme"; // Importando o tema
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskProvider } from "@/hooks/task";

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Ubuntu_700Bold,
        Ubuntu_500Medium,
        Ubuntu_400Regular
    });

    if (!fontsLoaded) {
        return <Loading />;
    }

    return (
        <ThemeProvider theme={theme}>
            <TaskProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="light" backgroundColor="black" translucent />
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
            </TaskProvider>
        </ThemeProvider>
    );
}
