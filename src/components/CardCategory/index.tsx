import { Container, TextCategory, ContentIcon } from "./styles";

import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

interface CardCategoryProps {
    nameCategory: string;
    value: string;
    icon: 'drink' | 'food' | 'cleaning' | 'toys';
}

export const CardCategory = ({ nameCategory, value, icon }: CardCategoryProps) => {

    const { navigate } = useNavigation() as any;

    const switchIcon = () => {
        switch (icon) {
            case 'cleaning':
                return <MaterialIcons name="dry-cleaning" size={24} />
            case 'drink':
                return <Entypo name="drink" size={24} />;
            case 'food':
                return <MaterialCommunityIcons name="food-turkey" size={24} />
            case 'toys':
                return <MaterialIcons name="toys" size={24} />
            default:
                return <Entypo name="drink" size={24} />;
        }
    }

    return (
        <Container onPress={() => navigate(value)}>
            <ContentIcon>
                {switchIcon()}
            </ContentIcon>
            <TextCategory
                style={{ fontFamily: 'Lato_400Regular' }}
            >
                {nameCategory}
            </TextCategory>
        </Container>
    )
}