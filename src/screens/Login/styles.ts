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
    logInButtonContainer: {},

    modalContainer: {
        marginTop: 100,
        marginHorizontal: '10%',
        width: '80%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#939191',
        borderStyle: 'solid'
    },
    modalText: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
