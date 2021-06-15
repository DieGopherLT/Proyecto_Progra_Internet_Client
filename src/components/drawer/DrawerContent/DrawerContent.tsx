import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Avatar as Aang } from 'react-native-elements';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';

import Button from '../../Button';

import useFetch from '../../../hooks/useFetch';
import storage from '../../../config/asyncstorage';
import StudentContext from '../../../context/StudentContext/StudentContext';
import RankContext from '../../../context/RankContext/RankContext';

import { UploadResponse, StudentResponse } from '../../../interfaces/Responses';
import { styles } from './styles';

export interface DrawerContentProps {
    toggleOpen: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ toggleOpen }) => {

    const { changeData } = useContext(RankContext);
    const { student, setStudent } = useContext(StudentContext);
    const { name, code, university, career, profilePicture } = student;

    const navigation = useNavigation();

    const [uploadImageToServerRequest] = useFetch<UploadResponse>({
        url: `https://samdt.000webhostapp.com/upload.php?code=${ code }`,
        method: 'POST',
        headers: {
            'Content-type': 'multipart/form-data',
        },
    });

    const [deleteStudentRequest] = useFetch<StudentResponse>({
        url: `https://progra-internet-server.herokuapp.com/api/student/${ code }`,
        method: 'DELETE',
    });

    const [getImageFromServerRequest] = useFetch<UploadResponse>({
        url: `https://progra-internet-server.herokuapp.com/api/upload/${ code }`,
    });

    useEffect(() => {
        const fetchData = async () => {
            await requestImageToServer();
        };
        fetchData();
    }, []);

    const logOut = async () => {
        try {
            const promises: Promise<any>[] = [
                deleteStudentRequest(),
                storage.remove({ key: 'student' }),
            ];

            const [deleteStudentResponse] = await Promise.all(promises);
            console.log(`Mensaje de API para borrar estudiante: ${ deleteStudentResponse.msg }`);
            setStudent({});
            navigation.navigate('Login');
        } catch(e) {
            console.log(e);
        }
    };

    const selectPicture = () => {
        const imageLibraryOptions: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(imageLibraryOptions, async (response: ImagePickerResponse) => {
                await uploadImage(response)
            },
        );
    };

    //Sube la imagen a la App y al servidor
    const uploadImage = async ({ uri, type, fileName, didCancel }: ImagePickerResponse) => {

        if(didCancel) return;

        try {
            const data = new FormData();
            data.append('img', { uri, type, name: fileName });

            const uploadImageToServerResponse = await uploadImageToServerRequest(data);
            setStudent({ ...student, profilePicture: uploadImageToServerResponse.host });
            await storage.save({ key: 'student', data: student });
            changeData();

            console.log(`Mensaje de API subir imágenes al server: ${ uploadImageToServerResponse.msg }`);
        } catch(error) {
            console.log(error);
        }
    };

    const requestImageToServer = async () => {
        try {
            const getImageFromServerResponse = await getImageFromServerRequest();
            console.log(`Mensaje API recuperar imagen: ${ getImageFromServerResponse.msg }`);

            setStudent({ ...student, profilePicture: getImageFromServerResponse.img });
            await storage.save({ key: 'student', data: student });
        } catch(e) {
            console.error(e);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={ styles.quitContainer }>
                    <Icon
                        name="x-circle"
                        type="foundation"
                        size={ 50 }
                        color="#FFF"
                        onPress={ toggleOpen }
                    />
                </View>

                { profilePicture
                    ? (
                        <View style={ styles.imageContainer }>
                            <Aang
                                source={ { uri: profilePicture } }
                                size="xlarge"
                                rounded
                            />
                        </View>
                    )
                    : null
                }

                <Button
                    backgroundColor="green"
                    text="Subir imagen"
                    onPress={ selectPicture }
                    containerStyles={ styles.buttonContainer }
                />

                <View style={ styles.container }>
                    <View style={ styles.dataContainer }>
                        <Text style={ styles.label }>Nombre:</Text>
                        <Text style={ styles.text }>{ name }</Text>
                    </View>

                    <View style={ styles.dataContainer }>
                        <Text style={ styles.label }>Código:</Text>
                        <Text style={ styles.text }>{ code }</Text>
                    </View>

                    <View style={ styles.dataContainer }>
                        <Text style={ styles.label }>Universidad:</Text>
                        <Text style={ styles.text }>{ university }</Text>
                    </View>

                    <View style={ styles.dataContainer }>
                        <Text style={ styles.label }>Carrera:</Text>
                        <Text style={ styles.text }>{ career }</Text>
                    </View>

                    <Button
                        backgroundColor="red"
                        text="Cerrar Sesión"
                        onPress={ logOut }
                        containerStyles={ styles.buttonContainer }
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default DrawerContent;
