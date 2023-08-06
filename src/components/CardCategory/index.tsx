import { Container, TextCategory, ContentIcon } from "./styles";

import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

interface CardCategoryProps {
    nameCategory: string;
    value: string;
    setValue: (data: string) => void;
    icon: 'drink' | 'food' | 'cleaning' | 'toys';
}

export const CardCategory = ({ nameCategory, value, setValue, icon }: CardCategoryProps) => {

    const handleSelectCategory = () => {
        setValue(nameCategory);
    }

    const switchIcon = () => {
        switch (icon) {
            case 'cleaning':
                return <MaterialIcons name="dry-cleaning" size={24} color={value.toLocaleUpperCase() === nameCategory.toLocaleUpperCase() ? '#ffffff' : '#000000'} />
            case 'drink':
                return <Entypo name="drink" size={24} color={value.toLocaleUpperCase() === nameCategory.toLocaleUpperCase() ? '#ffffff' : '#000000'} />;
            case 'food':
                return <MaterialCommunityIcons name="food-turkey" size={24} color={value.toLocaleUpperCase() === nameCategory.toLocaleUpperCase() ? '#ffffff' : '#000000'} />
            case 'toys':
                return <MaterialIcons name="toys" size={24} color={value.toLocaleUpperCase() === nameCategory.toLocaleUpperCase() ? '#ffffff' : '#000000'} />
            default:
                return <Entypo name="drink" size={24} color={value.toLocaleUpperCase() === nameCategory.toLocaleUpperCase() ? '#ffffff' : '#000000'} />;
        }
    }

    return (
        <Container selected={value.toLocaleUpperCase() === nameCategory.toLocaleUpperCase() ? true : false} onPress={handleSelectCategory}>
            <ContentIcon>
                {switchIcon()}
            </ContentIcon>
            <TextCategory
                selected={value.toLocaleUpperCase() === nameCategory.toLocaleUpperCase() ? true : false}
                style={{ fontFamily: 'Lato_400Regular' }}
            >
                {nameCategory}
            </TextCategory>
        </Container>
    )
}