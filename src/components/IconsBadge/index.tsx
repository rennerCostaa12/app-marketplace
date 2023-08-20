import { ReactNode } from "react";
import { Container, Badge, ContentIcon, ContentBadge } from "./styles"

interface IconsBadgeProps {
    icon: ReactNode;
    quantity?: number;
}

export const IconsBadge = ({ icon, quantity }: IconsBadgeProps) => {
    return (
        <Container>
            <ContentIcon>
                {icon}
            </ContentIcon>
            {quantity > 0 && (
                <ContentBadge>
                    <Badge style={{ fontFamily: 'Lato_400Regular' }}>
                        {quantity > 9 ? `9+` : quantity}
                    </Badge>
                </ContentBadge>
            )}
        </Container>
    )
}