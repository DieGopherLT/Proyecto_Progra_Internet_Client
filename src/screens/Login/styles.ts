import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#042b50',
        minHeight: '100%',
    },
    loginContainer: {
        backgroundColor: '#fff',
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 15,
        borderRadius: 10,
        padding: 20,
    },
    tittle: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    errorContainer: {
        marginTop: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid',
    },
    errorMessage: {
        textAlign: 'center',
        fontSize: 18,
        color: 'red',
    },
    logInButtonContainer: {},
    logInButton: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,
    },
    logInButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
