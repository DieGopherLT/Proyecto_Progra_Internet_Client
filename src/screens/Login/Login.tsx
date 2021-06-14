/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import useFetch from '../../hooks/useFetch';

import UdgLogo from '../../components/UdgLogo';
import InputFontAwesomeIcon from '../../components/InputFontAwesomeIcon';

import storage from '../../config/asyncstorage';
import StudentContext from '../../context/StudentContext/StudentContext';

import { Student } from '../../interfaces/Student.interface';
import { RootStackParamList } from '../../interfaces/ReactNavitationTypes';
import { StudentResponse } from '../../interfaces/Responses';

import { styles } from './styles';
import {
    showAlert,
} from './helpers';

interface LoginProps {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {

    const { setStudent } = useContext(StudentContext);

    const [studentCode, setStudentCode] = useState<string>('');
    const [nip, setNip] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const [logInRequest] = useFetch({
        isString: true,
        url: `https://cuceimobile.tech/Escuela/datosudeg.php?codigo=${ studentCode }&nip=${ nip }`,
    });

    const [createStudentRequest] = useFetch<StudentResponse>({
        url: 'https://progra-internet-server.herokuapp.com/api/student',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const logIn = async () => {
        if(studentCode === '' || nip === '') {
            showAlert();
            return;
        }
        //Will return a string with student info if student exists, will return zero if the student does not exist
        const logInResponse = await logInRequest();
        const dataArray = logInResponse.split(',');

        if(dataArray.length > 2) {
            const student: Student = {
                code: dataArray[1],
                name: dataArray[2],
                university: dataArray[3],
                career: dataArray[4],
            };

            setStudentCode('');
            setNip('');
            setStudent(student);

            await createStudent(student);
            navigation.navigate('Home');
        }
        else {
            setError(true);
            setTimeout(() => setError(false), 5000);
        }
    };

    //Crea el registro del estudiante en la base de datos y almacena en AsyncStorage
    const createStudent = async (student: Student) => {

        try {
            const studentStored = await storage.load({ key: `student` });
            if(!studentStored) {
                const createStudentResponse = await createStudentRequest(JSON.stringify(student));
                console.log(`Mensaje de API para crear estudiantes: ${ createStudentResponse.msg }`);

                await storage.save({
                    key: 'student',
                    data: student,
                    expires: null,
                });
            }
        } catch(e) {
            console.error(e);
        }
    };

    return (
        <View style={ styles.bg }>
            <View style={ styles.loginContainer }>
                <Text style={ styles.tittle }>Inicie sesión</Text>

                <UdgLogo/>

                <InputFontAwesomeIcon
                    name="user"
                    placeholder="Ingresa tu código"
                    value={ studentCode }
                    label="Código"
                    onChangeText={ (text: string) => setStudentCode(text.trim()) }
                    keyboardType="number-pad"
                />

                <InputFontAwesomeIcon
                    name="key"
                    placeholder="Ingresa tu Nip"
                    value={ nip }
                    label="Nip"
                    onChangeText={ (text: string) => setNip(text.trim()) }
                    secureTextEntry
                />

                <View style={ styles.logInButtonContainer }>
                    <TouchableHighlight style={ styles.logInButton } onPress={ logIn }>
                        <Text style={ styles.logInButtonText }>Iniciar sesión</Text>
                    </TouchableHighlight>
                </View>

                { error
                    ? (
                        <View style={ styles.errorContainer }>
                            <Text style={ styles.errorMessage }>Hubo un error, verifica que tus credenciales son
                                correctas.</Text>
                        </View>
                    )
                    : null
                }
            </View>
        </View>
    );
};

export default Login;
