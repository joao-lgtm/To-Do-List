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
    background-color: ${({ theme }: any) => theme.colors.black_900};
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

export const TextTitle = styled.Text`
    color: white;
    font-size: 24px;
    font-weight: bold;
`;

export const TextGeneric = styled.Text`
    color: ${({ theme } : any) => theme.colors.gray_800};
`;

export const DataContainer = styled.View`
    width: 100%;
`;

export const ContentData  = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 15px;

    border: 1px solid ${({ theme } : any) => theme.colors.gray};
    border-radius: 15px;
    padding: 12px;
    width: 100%;
`;