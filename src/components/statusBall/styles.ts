import styled from "styled-components/native";

export const Container = styled.View<{ status: number }>`
    height: 10px;
    width: 10px;
    border-radius: 5px; /* Em React Native, 50% não funciona para bordas */

    background-color: ${({ theme, status }: {theme: any, status: number}) => {
        switch (status) {
            case 0:
                return theme.colors.yellow;
            case 1:
                return theme.colors.red;
            case 2:
                return theme.colors.green;
        }
    }};
`;
