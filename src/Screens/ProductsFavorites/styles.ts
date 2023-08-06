import styled from 'styled-components/native';

export const Container = styled.View`
    margin-top: 20px;
`;

export const ContentProducts = styled.SafeAreaView``;

export const ContentCard = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px 10px;
    background-color: #FFFFFF;
    margin-bottom: 15px;
    elevation: 5;
`;

export const ContentImgProduct = styled.View``;

export const ImgProduct = styled.Image`
    width: 100px;
    height: 100px;
`;

export const ContentDescription = styled.View`
    flex: 1;
`;

export const TitleProduct = styled.Text`
    font-size: 18px;
`;

export const PriceProduct = styled.Text`
    font-size: 16px;
    margin: 7px 0;
`;

export const CategoryProduct = styled.Text`
    font-size: 14px;
    color: gray;
`;

export const ContentIcon = styled.View`
    margin: 0 10px;
`;

export const ButtonRemoveFavorite = styled.TouchableOpacity``;