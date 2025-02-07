import { IStatus } from "@/types/IStatus";
import { Container } from "./styles";

export function StatusBall({ status } : IStatus) {
    let statusCode;

    switch (status) {
        case "Pendente":
            statusCode = 0;
            break;
        case "Completo":
            statusCode = 2;
            break;
    }

    return <Container status={statusCode} />;
}
