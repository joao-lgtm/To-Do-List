import { ViewProps, TextInputProps } from "react-native";
import { Container, Content } from "./styles";
import React from "react";

interface InputProps {
  children: React.ReactNode;
  error?: boolean;
}

function Input({ children, error }: InputProps) {
    return (
        <Container error={error}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && "props" in child) {
                    return React.cloneElement(child as React.ReactElement<any>, { error });
                }
                return child;
            })}
        </Container>
    );
}

interface FieldProps extends TextInputProps {
  error?: boolean;
}

function Field({ error, ...rest }: FieldProps) {
    return <Content {...rest} error={error} />;
}

Input.Field = Field;

export { Input };
