import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: 275,
    },
    row: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    studentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    textContainer: {
        marginLeft: 10
    },
    studentCode: {
        fontSize: 14,
    },
    studentName: {
        fontSize: 12
    },
    studentPlace: {
        alignSelf: 'center',
        fontSize: 32,
        fontWeight: '900'
    },
    firstPlaceColor: {
        color: '#FFD700'
    },
    secondPlaceColor: {
        color: '#C0C0C0'
    },
    thirdPlaceColor: {
        color: '#cd7f32'
    },
    underTopPlaceColor: {
        color: '#000'
    }
});
