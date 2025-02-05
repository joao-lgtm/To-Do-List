import { IStatus } from "@/types/IStatus";
import { Container } from "./styles";

export function StatusBall({ status } : IStatus) {
    let statusCode;

    switch (status) {
        case "Pendente":
            statusCode = 0;
            break;
        case "Completado":
            statusCode = 2;
            break;
        case "Incompleto":
            statusCode = 1;
            break;
    }

    return <Container status={statusCode} />;
}
