import { ReactNode } from "react";
import { Container, Badge, ContentIcon } from "./styles"

interface IconsBadgeProps{
    icon: ReactNode;
    quantity?: number;
}

export const IconsBadge = ({ icon, quantity }: IconsBadgeProps) => {
    return(
        <Container>
            <ContentIcon>
                {icon}
            </ContentIcon>
            {quantity > 0 && (
                <Badge>
                    {quantity}
                </Badge>
            )}
        </Container>
    )
}