/* eslint-disable */
import React, { useContext, useState } from 'react';
import { Text, View, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import useFetch from '../../hooks/useFetch';

import UdgLogo from '../../components/UdgLogo';
import InputFontAwesomeIcon from '../../components/InputFontAwesomeIcon';

import storage from '../../config/asyncstorage';
import StudentContext from '../../context/StudentContext/StudentContext';

import { Student } from '../../interfaces/Student.interface';
import { RootStackParamList } from '../../interfaces/ReactNavitationTypes';
import { StudentResponse } from '../../interfaces/Responses';

import { styles } from './styles';
import Button from '../../components/Button';

interface LoginProps {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {

    const { setStudent } = useContext(StudentContext);

    const [studentCode, setStudentCode] = useState<string>('');
    const [nip, setNip] = useState<string>('');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>('');

    const [logInRequest] = useFetch({
        isString: true,
        domain: 'https://cuceimobile.tech/Escuela/',
        path: `datosudeg.php?codigo=${ studentCode }&nip=${ nip }`,
        method: 'GET'
    });

    const [createStudentRequest] = useFetch<StudentResponse>({
        domain: 'https://progra-internet-server.herokuapp.com/',
        path: 'api/student',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const logIn = async () => {
        if(studentCode === '' || nip === '') {
            showAlert('Todos los campos son obligatorios.');
            return;
        }

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
            showAlert('Estudiante no encontrado, credenciales incorrectas. Ingrese sus datos nuevamente.');
        }
    };

    //Crea el registro del estudiante en la base de datos y almacena en AsyncStorage
    const createStudent = async (student: Student) => {

        try {
            const createStudentResponse = await createStudentRequest(JSON.stringify(student));
            console.log(`Mensaje de API para crear estudiantes: ${ createStudentResponse.msg }`);

            await storage.save({
                key: 'student',
                data: student,
                expires: null,
            });
        } catch(e) {
            console.error(e);
        }
    };

    const showAlert = (msg: string) => {
        setModalText(msg);
        setModalOpen(true);

        setTimeout(() => {
            setModalOpen(false);
            setModalText('');
        }, 5000);
    };

    return (
        <View style={ styles.bg }>
            <View style={ styles.loginContainer }>

                <Modal
                    animationType="fade"
                    visible={ modalOpen }
                    transparent
                >
                    <View style={ styles.modalContainer }>
                        <Icon
                            type="foundation"
                            name="x-circle"
                            color="red"
                            size={ 80 }
                        />
                        <Text style={ styles.modalText }>{ modalText }</Text>
                    </View>
                </Modal>

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

                <Button
                    backgroundColor="green"
                    text="Iniciar sesión"
                    onPress={ logIn }
                    containerStyles={ styles.logInButtonContainer }
                />

            </View>
        </View>
    );
};

export default Login;
