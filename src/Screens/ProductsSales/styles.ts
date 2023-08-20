import styled from 'styled-components/native';

interface ButtonProps{
    color?: string;
}

interface TextButtonProps{
    color: string;
}

export const Container = styled.View`
    flex: 1;
`;

export const ContentCards = styled.SafeAreaView`
    height: 550px;
`;

export const Card = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 30px;
    padding: 20px 10px;
    background-color: #FFFFFF;
    margin-bottom: 15px;
    elevation: 5;
`;

export const ContentImage = styled.View``;

export const ImageProduct = styled.Image`
    width: 100px;
    height: 100px;
`;

export const ContentDescriptions = styled.View``;

export const TitleProduct = styled.Text`
   font-size: 24px;
`;
export const CategoryProduct = styled.Text`
    font-size: 14px;
    color: gray;
    margin: 10px 0;
`;

export const PriceProduct = styled.Text`
    font-size: 20px;
`;

export const ContentPriceAndQuantity = styled.View`
    margin: 10px 0;
    flex-direction: row;
    align-items: center;
    gap: 50px;
`;

export const ContentButtonCheckout = styled.View`
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    padding: 20px;
    gap: 10px;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
    width: 100%;
    background: ${({ color }) => color};
    padding: 20px 10px;
    border-radius: 5px;
`;

export const TextButton = styled.Text<TextButtonProps>`
    color: ${({ color }) => color};
    font-size: 20px;
    text-align: center;
`;

export const ButtonRemove = styled.TouchableOpacity`
    border: 1px solid #FF1493;
    border-radius: 5px;
    padding: 5px 10px;
    align-self: flex-start;
    margin: 10px 0;
`;

export const PriceFinal = styled.Text`
    font-size: 40px;
    text-align: center;
    margin: 10px 0;
    color: #FF1493;
`;

export const TextButtonRemove = styled.Text`
    font-size: 16px;
    color: #FF1493;
`;