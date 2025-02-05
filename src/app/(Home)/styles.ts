import styled from "styled-components/native";

interface TabProps{
  isActive: boolean;
};


export const Container = styled.View`
  flex: 1;
  background-color: #03001C;
  padding: 20px;
`;

export const TabsContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 16px;
`;

export const TabButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
`;

export const ActiveTab = styled.View<TabProps>`
    padding: 8px 16px;
    border-radius: 20px;
    background-color: ${({ isActive }: TabProps ) => (isActive ? "#6200ee" : "#DDD")};
`;

export const TabText = styled.Text<TabProps>`
    font-size: 16px;
    color: ${({ isActive } : TabProps) => (isActive ? "white" : "#333")};
    font-weight: ${({ isActive } : TabProps) => (isActive ? "bold" : "normal")};
`;


export const NewTask = styled.View`
  display: flex;
  gap: 10px;
`;