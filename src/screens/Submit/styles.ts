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
    initialDataContainer: {
        marginTop: 20,
        marginHorizontal: '20%'
    },
    numbersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    barSize: {
        height: 20,
        borderRadius: 10
    },
    positionIndicatorText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 15
    },
    loadingBarContainer: {
        marginTop: 20,
        marginHorizontal: '20%'
    },
    loadingBarText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center'
    }
});
