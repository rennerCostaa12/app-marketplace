import { styled } from "styled-components/native";

interface ContainerProps{
    selected: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    width: 100px;
    background-color: ${({ selected }) => selected ? '#FF1493' : '#F6F6F6'};
    padding: 5px;
    border-radius: 5px;
    align-items: center;
`

export const ContentIcon = styled.View`
    color: red !important;
`

export const TextCategory = styled.Text<ContainerProps>`
    font-size: 16px;
    color: ${({ selected }) => selected ? '#ffffff' : '#000000'};
`