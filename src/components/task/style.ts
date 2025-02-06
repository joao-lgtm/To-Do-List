import styled from "styled-components/native";

export const Container = styled.View`
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme } : any) => theme.colors.gray};
    border-radius: 6px;
    gap: 15px;    
    background-color:  ${({ theme } : any) => theme.colors.black_900};
    padding: 12px;
    margin-bottom: 15px;
`;

export const Content = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Description = styled.View`

`;

export const TitleText = styled.Text`
     color:rgb(163, 132, 28);
     font-size: 20px;
     font-family: ${({ theme } : any) => theme.fonts.bold};
     text-transform: uppercase;
`;

export const Status = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;


export const DescriptionText = styled.Text`
  color:${({ theme } : any) => theme.colors.white};
  font-size: 14px;
  font-family: ${({ theme } : any) => theme.fonts.bold};
  width: 200px;
`;

export const Buttons = styled.View`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const ConfirmButton = styled.View`
    width: 30px;
    height: 30px;
    border: 1px solid white;
    border-radius: 10px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AddTask = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
`;