import React, { FunctionComponent, useState, Fragment } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Divider, Input } from 'react-native-elements';
import {
        launchImageLibrary,
        launchCamera,
        ImageLibraryOptions,
        CameraOptions,
        ImagePickerResponse
} from 'react-native-image-picker';

import Button from '../Button';

interface SubmitFormProps{

}

const SubmitForm: FunctionComponent<SubmitFormProps> = (props) => {

    const [image, setImage] = useState<string>('');
    const [minutes, setMinutes] = useState<string>('');
    const [meters, setMeters] = useState<string>('');
    const [wasFromGallery, setWasFromGallery] = useState<boolean>(false);

    const selectPicture = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1
        }

        launchImageLibrary(options, ({ didCancel, uri }: ImagePickerResponse) => {
            setWasFromGallery(true);
            if(!didCancel)
                setImage(uri as string);
        })
    }

    const takePicture = () => {
        const options: CameraOptions = {
            quality: 1,
            cameraType: 'back',
            mediaType: 'photo',
        }

        launchCamera(options, ({ didCancel, uri }: ImagePickerResponse) => {
            if(!didCancel)
                setImage(uri as string);
        })
    }

    const deleteImage = () => {
        setImage('');
        setWasFromGallery(false);
    }

    return (
        <View style={ styles.container }>
            <Divider style={ styles.divider }/>
            <Text style={ styles.tittle }>Actualizar mi progreso</Text>

            <View style={ styles.inputsContainer }>
                <Input
                    value={ meters }
                    onChangeText={ value => setMeters(value) }
                    label='Distancia (mts)'
                    containerStyle={ styles.input }
                />
                <Input
                    value={ minutes }
                    onChangeText={ value => setMinutes(value) }
                    label='Tiempo (mins)'
                    containerStyle={ styles.input }
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
                                <Text style={ styles.text }>La imagen cargada será mostrada aquí</Text>
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
                onPress={ () => console.log('Hola') }
                containerStyles={ styles.buttonContainer }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: '5%',
        marginBottom: 175
    },
    divider: {
        marginVertical: 10
    },
    tittle: {
        fontSize: 24,
        marginLeft: 10
    },
    text: {
        fontSize: 14
    },
    inputsContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'baseline'
    },
    input: {
        width: '50%'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200
    },
    buttonContainer: {
        marginTop: 15
    }
});

export default SubmitForm;
