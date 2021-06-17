import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearProgress } from 'react-native-elements';

interface SubmitInitialDataProps{
    daysProgress: number;
    kilometersProgress: number;
    currentPosition: number;
    lastPosition: number;
}

const SubmitInitialData: FC<SubmitInitialDataProps> = props => {

    const { daysProgress, kilometersProgress, lastPosition, currentPosition } = props;

    return (
        <View style={ styles.initialDataContainer }>
            <View style={ styles.numbersContainer }>
                <Text>1</Text>
                <Text>Dias</Text>
                <Text>14</Text>
            </View>
            <LinearProgress
                color="primary"
                value={ daysProgress }
                variant="determinate"
                style={ styles.barSize }
            />

            <View style={ [styles.numbersContainer, { marginTop: 10 }] }>
                <Text>0</Text>
                <Text>Kilometros</Text>
                <Text>10</Text>
            </View>
            <LinearProgress
                color="primary"
                value={ kilometersProgress }
                variant="determinate"
                style={ styles.barSize }
            />

            <Text style={ styles.positionIndicatorText }>
                Tu posición: { currentPosition }/{ lastPosition }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
});

export default SubmitInitialData;
