import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: '5%',
    },
    goBackContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    goBackText: {
        fontSize: 16,
        marginLeft: 10
    },
    imageContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    loadingBarContainer: {
        marginTop: 20,
        marginHorizontal: '20%'
    },
    loadingBarText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center'
    },

    //MODAL
    modalContainer: {
        marginTop: 90,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: '10%',
        width: '80%',
        height: 225,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#939191',
        borderStyle: 'solid'
    },
    modalText: {
        marginVertical: 10,
        fontSize: 16
    },
    modalButton: {
        marginHorizontal: '20%',
        width: '60%'
    }
});
