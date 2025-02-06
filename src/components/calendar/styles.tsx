import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const styles = StyleSheet.create({

    calendar:{
        backgroundColor: "transparent"
    }
})

export const Container = styled.View`
    background-color: ${({ theme }: any) => theme.colors.black};
    border-radius: 10px;
    
`;

export const Background = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }: any) => theme.colors.black_800};
`;


export const Buttons = styled.View`
    display: flex;
    flex-direction: row;
    gap: 15px;
`;