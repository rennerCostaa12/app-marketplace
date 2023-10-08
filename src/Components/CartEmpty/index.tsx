import { Container, Text } from "./styles";

import LottiView from 'lottie-react-native';

interface CartEmptyProps{
    text?: string;
}

export const CartEmpty = ({ text }: CartEmptyProps) => {
    return(
        <Container>
            <LottiView
                source={require('../../assets/animations/product-notfound.json')}
                style={{
                    width: 250,
                    height: 250
                }}
                autoPlay
                loop
            />
            {text ? <Text style={{ fontFamily: 'Lato_400Regular'}}>{text}</Text> : null}
        </Container>
    )
}