import { styled } from "styled-components/native";

export const Container = styled.View`
    width: 180px;
    background-color: white;
    padding: 1px;
    elevation: 3;
`


export const ContentDescriptionsItem = styled.View`
    padding: 10px 5px;
`

export const ContentImg = styled.View`
    justify-content: center;
    align-items: center;
    background-color: #F1EFF1;
`

export const ImageItem = styled.Image`
    width: 50%;
    height: 120px;
`

export const NameItem = styled.Text`
    font-size: 16px;
`

export const PriceItem = styled.Text`
    font-size: 20px;
    text-align: right;
    color: #649A8C;
    margin: 5px 0;
`
export const CategoryItem = styled.Text`
    font-size: 13px;
    color: gray;
`

export const ContentIconFavorite = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    margin: 5px;
`
