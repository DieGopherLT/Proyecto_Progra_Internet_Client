import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { LinearProgress } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import DrawerContent from '../../components/drawer/DrawerContent/DrawerContent';
import Drawer from '../../components/drawer/Drawer';
import Navbar from '../../components/Navbar/Navbar';

import useFetch from '../../hooks/useFetch';
import useDrawer from '../../hooks/useDrawer';

import StudentContext from '../../context/StudentContext/StudentContext';

import { RootStackParamList } from '../../interfaces/ReactNavitationTypes';
import { SubmitInitialDataResponse } from '../../interfaces/Responses';

import { meterToKilometer } from '../../helpers';
import { styles } from './styles';

interface SubmitProps {
    navigation: StackNavigationProp<RootStackParamList, 'Submit'>
}

const Submit: FunctionComponent<SubmitProps> = ({ navigation }) => {

    const { student: { code } } = useContext(StudentContext);

    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [data, setData] = useState({
        daysProgress: 0,
        kilometersProgress: 0,
        currentPosition: 0,
        lastPosition: 0
    });

    const { open, toggleOpen, drawerContent } = useDrawer(DrawerContent);

    const [ initialDataRequest ] = useFetch<SubmitInitialDataResponse>({
        url: `https://progra-internet-server.herokuapp.com/api/student/places/${ code }`
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const initialDataResponse = await initialDataRequest();
                setData({
                    currentPosition: initialDataResponse.currentStudentPlace,
                    lastPosition: initialDataResponse.lastPlace,
                    kilometersProgress: kilometerProgression(initialDataResponse.studentPlace.student.Distancia),
                    daysProgress: dayProgression(initialDataResponse.date)
                });
                setDataLoaded(true);
            } catch(e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const goBackHome = () => navigation.navigate('Home');

    const dayProgression = (dateString: string): number => {
        const date = dateString.split('-');
        const [year, month, day] = date;

        const initialMarathonYear = parseInt(year);
        const initialMarathonMonth = parseInt(month.charAt(1)) - 1;
        const initialMarathonDay = parseInt(day.charAt(1));

        const initialDate = new Date(initialMarathonYear, initialMarathonMonth , initialMarathonDay);
        // const finishDate = new Date(initialMarathonYear, initialMarathonMonth, initialMarathonDay + 10);
        const todayDay = new Date().toLocaleDateString().split('/')[1];
        const currentDay = parseInt(todayDay) - initialDate.getDate();

        return currentDay / 10;
    }

    const kilometerProgression = (meters: string): number => {
        const maxKilometers = 10;
        const kilometers = meterToKilometer(meters);
        return kilometers / maxKilometers;
    }

    const marathonLogo = require('../../assets/images/Recurso_4-1.png');
    const { currentPosition, lastPosition, daysProgress, kilometersProgress } = data;

    return (
        <Drawer
            open={ open }
            drawerContent={ drawerContent() }
        >
            <SafeAreaView>
                <ScrollView>
                    <Navbar toggleOpen={ toggleOpen }/>

                    <View style={ styles.container }>
                        <View style={ styles.goBackContainer }>
                            <Icon
                                type="font-awesome"
                                name="chevron-left"
                                size={ 25 }
                                color="#000"
                                onPress={ goBackHome }
                            />
                            <Text style={ styles.goBackText }>Volver a inicio</Text>
                        </View>

                        <View style={ styles.imageContainer }>
                            <Image
                                source={ marathonLogo }
                                resizeMethod='resize'
                                resizeMode='contain'
                                style={{ height: 175, width: 250 }}
                            />
                        </View>


                        {
                            dataLoaded
                                ?
                                    (
                                        <View style={ styles.initalDataContainer }>
                                            <View style={ styles.numbersContainer }>
                                                <Text>1</Text>
                                                <Text>Dias</Text>
                                                <Text>10</Text>
                                            </View>
                                            <LinearProgress
                                                color="primary"
                                                value={ daysProgress }
                                                variant='determinate'
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
                                                variant='determinate'
                                                style={ styles.barSize }
                                            />

                                            <Text style={ styles.positionIndicatorText }>
                                                Tu posición: { currentPosition }/{ lastPosition }
                                            </Text>
                                        </View>
                                    )
                                :
                                    (
                                        <View style={ styles.loadingBarContainer }>
                                            <Text style={ styles.loadingBarText }>
                                                Cargando...
                                            </Text>
                                            <LinearProgress color="#000" />
                                        </View>
                                    )
                        }

                    </View>
                </ScrollView>
            </SafeAreaView>
        </Drawer>
    );
};

export default Submit;
