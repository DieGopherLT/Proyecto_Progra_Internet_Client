import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { Avatar, ListItem } from 'react-native-elements';

import { Student } from '../../../interfaces/RankData.interface';

import { meterToKilometer } from '../../../helpers';

interface StudentCardProps {
    student: Student;
    place: number;
}

const StudentCard: FunctionComponent<StudentCardProps> = ({ student, place }) => {

    const sliceName = (name: string) => {
        const splittedName = name.split(' ');

        if(splittedName.length > 3){
            const [firstName, secondName, lastname] = splittedName;
            return `${ firstName } ${ secondName } ${ lastname }`;
        }
        else
            return name;
    };

    const placeToString = (place: number) => {

        const lastDigit = place.toString().split('').pop();

        switch(true) {
            case lastDigit === '1':
                return `${ place }st`;
            case lastDigit === '2':
                return `${ place }nd`;
            case lastDigit === '3':
                return `${ place }rd`;
            default:
                return `${ place }th`;
        }
    };

    const minutesToHours = (minutes: string) => {
        const hours = Math.trunc(parseInt(minutes) / 60);
        const leftMinutes = Math.trunc(parseInt(minutes) - (hours * 60));

        if(leftMinutes === 0)
            return `${hours} hora(s)`;
        else
            return `${hours} hora(s), ${leftMinutes} minutos`;
    }

    const positionTextColor = (place: number) => {
        switch(place) {
            case 1:
                return styles.firstPlaceColor;
            case 2:
                return styles.secondPlaceColor;
            case 3:
                return styles.thirdPlaceColor;
            default:
                return styles.underTopPlaceColor;
        }
    }

    return (
        <ListItem bottomDivider>
                <View style={ styles.container }>
                    <View style={ styles.studentContainer }>
                        <Avatar source={ { uri: student.imagen } } size="medium" rounded/>
                        <View style={ styles.textContainer }>
                            <Text style={ styles.studentName }>{ sliceName(student.Nombre) }</Text>
                            <Text style={ styles.studentCode }>Código: { student.Codigo }</Text>
                        </View>
                    </View>

                    <View style={ styles.row }>
                        <View>
                            <Text>Distancia: { meterToKilometer(student.Distancia) } km</Text>
                            <Text>{ minutesToHours(student.Tiempo) }</Text>
                        </View>
                        <Text
                            style={ [styles.studentPlace, positionTextColor(place)]}
                        >{ placeToString(place) }</Text>
                    </View>
                </View>
        </ListItem>
    );
};

export default StudentCard;
