import styled from "styled-components/native";

export const Background = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }: any) => theme.colors.black_800};
`;


export const Container = styled.View`
    width: 300px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
`;

export const Buttons = styled.View`
    display: flex;
    flex-direction: row;
    gap: 15px;
`;