import { View, ViewProps,TextInput,TextInputProps } from "react-native";
import { Container, Content } from "./styles";

function Input({ children } : ViewProps){
    return <Container>{children}</Container>
}


function Field({ ...rest }: TextInputProps){
   return <Content {...rest}/>
}

Input.Field = Field


export {Input}