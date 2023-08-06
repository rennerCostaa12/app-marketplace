import { Container } from "./styles";

import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import LottiView from 'lottie-react-native';

export const ApresentationApp = () => {

    const { navigate } = useNavigation() as any;

    useEffect(() => {
        setTimeout(() => {
            navigate('tab_routes');
        }, 3000);
    }, []);

    return(
        <Container>
            <LottiView
                autoPlay
                style={{
                    width: 250,
                    height: 250,
                }}
                source={require('../../assets/animations/cart-apresentation.json')}
            />
        </Container>
    )
}