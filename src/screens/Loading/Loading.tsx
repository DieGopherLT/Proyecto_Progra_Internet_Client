import React, { FunctionComponent, useEffect, useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../interfaces/ReactNavitationTypes';

import StudentContext from '../../context/StudentContext/StudentContext';
import storage from '../../config/asyncstorage';
import { Student } from '../../interfaces/Student.interface';

import { styles } from './styles';

interface LoadingProps{
    navigation: StackNavigationProp<RootStackParamList, 'Loading'>;
}

const Loading: FunctionComponent<LoadingProps> = ({ navigation }) => {

    const { setStudent } = useContext(StudentContext);

    useEffect(() => {
        setTimeout(() => {
            const fetchDataFromStorage = async () => {
                const studentStored = await storage.load<Student>({ key: 'student' });
                if(studentStored) {
                    setStudent(studentStored);
                    navigation.navigate('Home');
                }
                else
                    navigation.navigate('Login');
            };
            fetchDataFromStorage();
        }, 2000);
    }, []);

    return (
        <View style={ styles.spinnerContainer }>
            <ActivityIndicator size='large' color='#000'/>
            <Text style={ styles.text }>Iniciando la app...</Text>
        </View>
    )
}

export default Loading;
