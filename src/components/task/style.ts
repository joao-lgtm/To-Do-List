import styled from "styled-components/native";

export const Container = styled.View`
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }: any) => theme.colors.gray};
    border-radius: 6px;
    gap: 15px;    
    background-color:  ${({ theme }: any) => theme.colors.black_900};
    padding: 12px;
    margin-bottom: 15px;
`;

export const Content = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Info = styled.View `
    flex: 1;
    gap: 5px;
`;

export const Description = styled.View`
    width: 200px;
`;

export const TitleText = styled.Text`
     color:rgb(163, 132, 28);
     font-size: 20px;
     font-family: ${({ theme }: any) => theme.fonts.medium};
     text-transform: uppercase;
`;

export const Status = styled.View<{ status: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    border: 1px solid ${({ status , theme }: any) => 
        status === "Completo" ? theme.colors.green_100 : 
        status === "Pendente" ? theme.colors.orange_100 :
        theme.colors.red_100};


    background-color: ${({ status, theme }: any) => 
        status === "Completo" ? theme.colors.green_200 : 
        status === "Pendente" ? theme.colors.orange_200 :
        theme.colors.red_200
    };
    border-radius: 5px;
    padding: 3px;
    width: 120px;

`;


export const DescriptionText = styled.Text`
  color:${({ theme }: any) => theme.colors.white};
  font-size: 14px;
  font-family: ${({ theme }: any) => theme.fonts.bold};
  color:${({ theme }: any) => theme.colors.white} ;
`;

export const StatusText = styled.Text <{ status: string }>`
  color:${({ theme }: any) => theme.colors.white};
  font-size: 14px;
  font-family: ${({ theme }: any) => theme.fonts.bold};
  
  color:${({ status, theme }: any) => 
            status === "Completo" ? theme.colors.green_300 : 
            status === "Pendente" ? theme.colors.orange_300 :
            theme.colors.red_300
        }
    ;
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