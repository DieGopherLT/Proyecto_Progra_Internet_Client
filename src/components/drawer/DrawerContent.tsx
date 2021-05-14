import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';

import useFetch from '../../hooks/useFetch';
import storage from '../../config/asyncstorage';
import StudentContext from '../../context/StudentContext/StudentContext';

import { Student } from '../../interfaces/Student.interface';
import { UploadResponse } from '../../interfaces/UploadResponse.interface';

export interface DrawerContentProps {
    toggleOpen: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ toggleOpen }) => {

    const { student, setStudent } = useContext(StudentContext);
    const { name, code, university, career, profilePicture } = student;

    const navigation = useNavigation();

    const [ uploadImageToServerRequest ] = useFetch<UploadResponse>({
        url: `http://localhost:4000/api/upload/${ code }`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'multipart/form-data',
        },
    });

    const [ getImageFromServerRequest ] = useFetch<UploadResponse>({
        url: `http://localhost:4000/api/upload/${ code }`,
    });

    useEffect(() => {
        const fetchData = async () => {
            const studentStored = await storage.load({ key: `student` }) as Student;
            console.log(studentStored.profilePicture ? 'Hay imagen almacenada' : 'No hay imagen');

            if(!studentStored.profilePicture) {
                await requestImageToServer();
            }
            else {
                setStudent(studentStored);
            }
        };
        fetchData();
    }, []);

    const logOut = async () => {
        await storage.remove({ key: 'student' });
        setStudent({});
        navigation.navigate('Login');
    };

    const selectPicture = () => {
        const imageLibraryOptions: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
        };

        launchImageLibrary(imageLibraryOptions, (response: ImagePickerResponse) => {
              uploadImageServer(response);
          },
        );
    };

    const uploadImageServer = async ({ uri, type, fileName, base64 }: ImagePickerResponse) => {

        if(!uri) return;

        setStudent({ ...student, profilePicture: base64 });
        await storage.save({ key: 'student', data: student });

        try {
            const data = new FormData();
            data.append('img', { uri, type, name: fileName });

            const response = await uploadImageToServerRequest(data);
            console.log(`Mensaje de API subir imágenes al server: ${ response.msg }`);
        } catch(error) {
            console.error(error);
        }
    };

    const requestImageToServer = async () => {
        try {
            const image = await getImageFromServerRequest();
            console.log(`Mensaje API recuperar imagen: ${ image.msg }`);

            setStudent({ ...student, profilePicture: image.img });
            await storage.save({ key: 'student', data: student });
        } catch(e) {
            console.error(e);
        }
    };

    return (
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
                        <Image
                            source={ { uri: `data:image/jpg;base64,${ profilePicture }` } }
                            style={ styles.image }
                            resizeMethod="resize"
                            resizeMode="contain"
                        />
                    </View>
                )
                : null
          }

          <View style={ styles.buttonContainer }>
              <TouchableHighlight style={ styles.buttonUpload } onPress={ selectPicture }>
                  <Text style={ styles.buttonText }>Subir imagen</Text>
              </TouchableHighlight>
          </View>

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

              <View style={ styles.buttonContainer }>
                  <TouchableHighlight style={ styles.buttonLogOut } onPress={ logOut }>
                      <Text style={ styles.buttonText }>Cerrar Sesión</Text>
                  </TouchableHighlight>
              </View>

          </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    quitContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: '#fff',
    },
    container: {
        marginTop: 5,
    },
    label: {
        color: '#fff',
    },
    text: {
        color: '#fff',
    },
    imageContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        height: 160,
        width: 160,
    },
    dataContainer: {
        marginTop: 5,
    },
    buttonContainer: {
        marginTop: 10,
    },
    buttonUpload: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 10,
    },
    buttonLogOut: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});


export default DrawerContent;
