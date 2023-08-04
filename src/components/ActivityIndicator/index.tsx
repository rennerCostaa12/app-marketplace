import { ActivityIndicator as ActivityIndicatorReactNative } from 'react-native';

interface ActivityIndicatorProps{
    color: string;
    visible: boolean;
    size: 'small' | 'large';
}

export const ActivityIndicator = ({ color, size, visible }: ActivityIndicatorProps) => {
    return(
        <>
            {visible ? <ActivityIndicatorReactNative color={color} size={size} /> : null}
        </>
    )
}