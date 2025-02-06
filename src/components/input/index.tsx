import { ViewProps, TextInputProps } from "react-native";
import { Container, Content } from "./styles";
import React from "react";

function Input({ children, error }: { children: React.ReactNode, error?: boolean }) {
    return (
        <Container error={error}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { error });
                }
                return child;
            })}
        </Container>
    );
}

function Field({ error, ...rest }: TextInputProps & { error?: boolean }) {
    return (
        <Content
            {...rest}
            error={error}
        />
    );
}

Input.Field = Field;

export { Input };
