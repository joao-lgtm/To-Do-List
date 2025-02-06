import styled from "styled-components/native";

export const Container = styled.View`
    border: 1px solid ${({ theme } : any) => theme.colors.gray};
    padding: 5px;
    border-radius: 15px;
    width: 100%;
`;

export const Content = styled.TextInput.attrs((props: any) => ({
    placeholderTextColor: props.theme.colors.gray_800
  }))`
    color: white;
  `;
  