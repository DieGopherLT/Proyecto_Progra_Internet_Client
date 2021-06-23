import React, { FunctionComponent, useState, Fragment } from 'react';
import { View, StyleSheet, Text, Image, ToastAndroid } from 'react-native';
import { Divider, Input } from 'react-native-elements';
import {
        launchImageLibrary,
        launchCamera,
        ImageLibraryOptions,
        CameraOptions,
        ImagePickerResponse
} from 'react-native-image-picker';

import Button from '../Button';

import useFetch from '../../hooks/useFetch';

import { StudentResponse, UploadResponse } from '../../interfaces/Responses';
import { Student } from '../../interfaces/Student.interface';

import { styles } from './styles';

interface SubmitFormProps{
    student: Student;
}

const SubmitForm: FunctionComponent<SubmitFormProps> = ({ student }) => {

    const [data, setData] = useState({
        image: '',
        name: '',
        type: '',
        minutes: '',
        meters: ''
    });
    const [wasFromGallery, setWasFromGallery] = useState<boolean>(false);

    const [uploadEvidenceImageRequest] = useFetch<UploadResponse>({
        url: 'https://samdt.000webhostapp.com/uploadEvidence.php',
        method: 'POST'
    });

    const [updateVerifyDatabaseRequest] = useFetch<StudentResponse>({
        url: 'https://progra-internet-server.herokuapp.com/api/progress/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const selectPicture = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1
        }

        launchImageLibrary(options, ({ didCancel, uri, type, fileName }: ImagePickerResponse) => {
            setWasFromGallery(true);
            if(!didCancel) {
                setData({ ...data, image: uri as string, type: type as string, name: fileName as string });
            }
        })
    }

    const takePicture = () => {
        const options: CameraOptions = {
            quality: 1,
            cameraType: 'back',
            mediaType: 'photo',
        }

        launchCamera(options, ({ didCancel, uri, type, fileName }: ImagePickerResponse) => {
            if(!didCancel){
                setData({ ...data, image: uri as string, type: type as string, name: fileName as string });
            }
        })
    }

    const submitRequestToServer = async () => {

        if(Object.values(data).some(field => field === '')){
            ToastAndroid.show('Todos los campos son obligatorios', 4000);
            return ;
        }

        try {
            const imgData = new FormData();
            imgData.append('img', { uri: data.image, type: data.type, name: data.name });
            const uploadEvidenceImageResponse = await uploadEvidenceImageRequest(imgData);

            const requestData = {
                code: student.code,
                name: student.name,
                image: uploadEvidenceImageResponse.host,
                distance: data.meters,
                time: data.minutes
            };

            const updateVerifyDatabaseResponse = await updateVerifyDatabaseRequest(JSON.stringify(requestData));
            ToastAndroid.show(updateVerifyDatabaseResponse.msg, 4000);
            setData({
                meters: '',
                image: '',
                minutes: '',
                type: '',
                name: ''
            });
        }
        catch(e) {
            console.error(e);
        }
    }

    const deleteImage = () => {
        setData({...data, image: ''});
        setWasFromGallery(false);
    }

    const { meters, minutes, image } = data;

    return (
        <View style={ styles.container }>
            <Divider style={ styles.divider }/>
            <Text style={ styles.tittle }>Actualizar mi progreso</Text>

            <View style={ styles.inputsContainer }>
                <Input
                    value={ meters }
                    onChangeText={ value => setData({ ...data, meters: value }) }
                    label='Distancia (mts)'
                    containerStyle={ styles.input }
                    keyboardType="number-pad"
                />
                <Input
                    value={ minutes }
                    onChangeText={ value => setData({ ...data, minutes: value }) }
                    label='Tiempo (mins)'
                    containerStyle={ styles.input }
                    keyboardType="number-pad"
                />
            </View>

            {
                (image !== '')
                    ?
                        (
                            <View style={ styles.imageContainer }>
                                <Image
                                    source={ { uri: image } }
                                    style={ styles.image }
                                />
                            </View>
                        )
                    :
                        (
                            <View style={ styles.imageContainer }>
                                <Text style={ styles.text }>Se debe subir una imagen como evidencia.</Text>
                            </View>
                        )
            }

            <View style={ [styles.inputsContainer, { justifyContent: 'space-between', marginTop: 30 }] }>

                {
                    (image === '')
                        ?
                            (
                                <Fragment>
                                    <Button
                                        backgroundColor="#2c778f"
                                        text="Subir foto"
                                        onPress={ selectPicture }
                                        containerStyles={ { width: '48%' } }
                                    />
                                    <Button
                                        backgroundColor="#2c778f"
                                        text="Tomar foto"
                                        onPress={ takePicture }
                                        containerStyles={ { width: '48%' } }
                                    />
                                </Fragment>
                            )
                        :
                            (
                                <Fragment>
                                    <Button
                                        backgroundColor="#2c778f"
                                        text={ wasFromGallery ? 'Subir otra' : 'Tomar otra' }
                                        onPress={ wasFromGallery ? selectPicture : takePicture }
                                        containerStyles={ { width: '48%' } }
                                    />
                                    <Button
                                        backgroundColor="red"
                                        text="Quitar"
                                        onPress={ deleteImage }
                                        containerStyles={ { width: '48%' } }
                                    />
                                </Fragment>
                            )
                }
            </View>

            <Button
                backgroundColor="green"
                text="Subir progreso"
                onPress={ submitRequestToServer }
                containerStyles={ styles.buttonContainer }
            />
        </View>
    )
}

export default SubmitForm;
