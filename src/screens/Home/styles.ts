import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    textContainer: {
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        marginVertical: 5,
        fontSize: 16,
    },
    rankListContainer: {
        marginHorizontal: '5%',
        marginTop: 10,
        alignItems: 'center'
    },
    loadingBarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: '10%'
    },
    loadingBarText: {
        fontSize: 14,
        marginVertical: 10
    },


    //Proximo a componentizar
    goSubmitButtonContainer: {
        marginTop: 10,
        marginBottom: 30,
        marginHorizontal: '10%'
    },
});
