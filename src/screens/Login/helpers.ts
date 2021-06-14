import { Alert } from 'react-native';

export const showAlert = () => {
    Alert.alert('Error', 'Ambos campos son obligatorios', [
        { text: 'Ok' },
    ]);
};
