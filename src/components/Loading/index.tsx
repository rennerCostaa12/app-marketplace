import { Container } from "./styles";

import LottiView from 'lottie-react-native';

import { Modal, Text } from 'react-native';

interface LoadingProps {
    visible: boolean;
}

export const Loading = ({ visible }: LoadingProps) => {

    return (
        <Modal
            visible={visible}
            transparent
        >
            <Container>
                <LottiView
                    autoPlay
                    style={{
                        width: 300,
                        height: 300,
                    }}
                    source={require('../../assets/animations/loading-cart.json')}
                />
            </Container>
        </Modal>
    )
}