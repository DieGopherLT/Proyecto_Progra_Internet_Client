/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import useFetch from '../hooks/useFetch';

import UdgLogo from '../components/UdgLogo';
import InputFontAwesomeIcon from '../components/InputFontAwesomeIcon';

import storage from '../config/asyncstorage';
import StudentContext from '../context/StudentContext/StudentContext';

import { Student } from '../interfaces/Student.interface';
import { RootStackParamList } from '../interfaces/ReactNavitationTypes';
import { StudentResponse } from '../interfaces/Responses';

interface LoginProps {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {

    const { setStudent } = useContext(StudentContext);

    const [studentCode, setStudentCode] = useState<string>('');
    const [nip, setNip] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const [loginData] = useFetch({
        isString: true,
        url: `https://cuceimobile.tech/Escuela/datosudeg.php?codigo=${ studentCode }&nip=${ nip }`,
    });

    const [createStudentRequest] = useFetch<StudentResponse>({
        url: 'http://localhost:4000/api/student/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    useEffect(() => {
        const fetchDataFromStorage = async () => {
            const studentStored = await storage.load({ key: 'student' });
            if(studentStored) {
                setStudent(studentStored);
                navigation.navigate('Home');
            }
        };
        fetchDataFromStorage();
    }, []);

    const logIn = async () => {
        if(studentCode === '' || nip === '') {
            showAlert();
            return;
        }
        const result = await loginData();
        const dataArray = result.split(',');

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
        }
        else {
            setError(true);
            setTimeout(() => setError(false), 5000);
        }
    };

    const createStudent = async (student: Student) => {

        try {
            const studentStored = await storage.load({ key: `student` });
            if(!studentStored) {
                const response = await createStudentRequest(JSON.stringify(student));
                console.log(`Mensaje de API para crear estudiantes: ${ response.msg }`);

                await storage.save({
                    key: 'student',
                    data: student,
                    expires: null,
                });
            }
            navigation.navigate('Home');
        } catch(e) {
            console.error(e);
        }
    };

    const showAlert = () => {
        Alert.alert('Error', 'Ambos campos son obligatorios', [
            { text: 'Ok' },
        ]);
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

const styles = StyleSheet.create({
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

export default Login;
