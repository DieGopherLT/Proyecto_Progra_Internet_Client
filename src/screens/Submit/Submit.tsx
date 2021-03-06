import React, { FunctionComponent, useState, useEffect, useContext, Fragment } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, RefreshControl, Modal } from 'react-native';
import { LinearProgress } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import DrawerContent from '../../components/Drawer/DrawerContent/DrawerContent';
import Drawer from '../../components/Drawer/Drawer';
import Navbar from '../../components/Navbar/Navbar';
import SubmitInitialData from '../../components/SubmitInitialData/SubmitInitialData';
import SubmitForm from '../../components/SubmitForm/SubmitForm';
import Button from '../../components/Button';

import useFetch from '../../hooks/useFetch';
import useDrawer from '../../hooks/useDrawer';

import storage from '../../config/asyncstorage';
import RankContext from '../../context/RankContext/RankContext';
import StudentContext from '../../context/StudentContext/StudentContext';

import { RootStackParamList } from '../../interfaces/ReactNavitationTypes';
import { SubmitInitialDataResponse } from '../../interfaces/Responses';

import { meterToKilometer } from '../../helpers';
import { styles } from './styles';

interface SubmitProps {
    navigation: StackNavigationProp<RootStackParamList, 'Submit'>
}

const Submit: FunctionComponent<SubmitProps> = ({ navigation }) => {

    const { changeData } = useContext(RankContext);
    const { student } = useContext(StudentContext);
    const { code } = student;

    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [data, setData] = useState({
        daysProgress: 0,
        kilometersProgress: 0,
        currentPosition: 0,
        lastPosition: 0,
    });

    const { open, toggleOpen, drawerContent } = useDrawer(DrawerContent);

    const [initialDataRequest] = useFetch<SubmitInitialDataResponse>({
        domain: 'https://progra-internet-server.herokuapp.com/',
        path: `api/student/places/${ code }`,
        method: 'GET'
    });

    useEffect(() => {
        const effect = async () => {
            await fetchData();
            setDataLoaded(true);
        }
        effect();
    }, []);

    const fetchData = async () => {
        try {
            const [initialDataResponse, accomplished] = await Promise.all([
                initialDataRequest(),
                storage.load<boolean>({ key: 'accomplished' })
            ]);
            const {
                currentStudentPlace, lastPlace, date, studentPlace: { student: { Distancia } },
            } = initialDataResponse;

            if(!accomplished && parseInt(Distancia) >= 10000){
                await storage.save({ key: 'accomplished', data: true, expires: null });
                setShowModal(true);
            }

            setData({
                currentPosition: currentStudentPlace,
                lastPosition: lastPlace,
                kilometersProgress: kilometerProgression(Distancia),
                daysProgress: dayProgression(date),
            });
        } catch(e) {
            console.log(e);
        }
    };

    const goBackHome = () => navigation.navigate('Home');

    const dayProgression = (dateString: string): number => {
        const date = dateString.split('-');
        const [year, month, day] = date;

        const initialMarathonYear = parseInt(year);
        const initialMarathonMonth = parseInt(month.charAt(1)) - 1;
        const initialMarathonDay = parseInt((day.charAt(0) === '0') ? day.charAt(1) : day);

        const initialDate = new Date(initialMarathonYear, initialMarathonMonth, initialMarathonDay);
        const todayDay = new Date().getDate();
        const currentDay = todayDay - initialDate.getDate();
        return currentDay / 10;
    };

    const kilometerProgression = (meters: string): number => {
        const maxKilometers = 10;
        const kilometers = meterToKilometer(meters);
        return kilometers / maxKilometers;
    };

    const onRefresh = async () => {
        changeData();
        setRefreshing(true);
        setDataLoaded(false);
        await fetchData();

        setTimeout(() => {
            setRefreshing(false);
            setDataLoaded(true);
        }, 1500);
    };

    const marathonLogo = require('../../assets/images/Recurso_4-1.png');
    const { currentPosition, lastPosition, daysProgress, kilometersProgress } = data;

    return (
        <Drawer
            open={ open }
            drawerContent={ drawerContent() }
        >
            <SafeAreaView>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={ onRefresh } />
                    }
                >
                    <Navbar toggleOpen={ toggleOpen }/>
                        <View style={ styles.container }>

                            <Modal
                                visible={ showModal }
                                animationType="fade"
                                transparent
                            >
                                <View style={ styles.modalContainer }>
                                    <Icon
                                        type="foundation"
                                        name="trophy"
                                        color="black"
                                        size={ 70 }
                                    />
                                    <Text style={ styles.modalText }>
                                        ??Llegaste a la meta!
                                    </Text>
                                    <Button
                                        backgroundColor="green"
                                        text="Ok."
                                        onPress={ () => setShowModal(false) }
                                        containerStyles={ styles.modalButton }
                                    />
                                </View>
                            </Modal>

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
                                    resizeMethod="resize"
                                    resizeMode="contain"
                                    style={ { height: 175, width: 250 } }
                                />
                            </View>


                            {
                                dataLoaded
                                    ?
                                        (
                                            <Fragment>
                                                <SubmitInitialData
                                                    daysProgress={ daysProgress }
                                                    kilometersProgress={ kilometersProgress }
                                                    currentPosition={ currentPosition }
                                                    lastPosition={ lastPosition }
                                                />
                                                <SubmitForm
                                                    student={ student }
                                                />
                                            </Fragment>
                                        )
                                    :
                                        (
                                            <View style={ styles.loadingBarContainer }>
                                                <Text style={ styles.loadingBarText }>
                                                    Cargando...
                                                </Text>
                                                <LinearProgress color="#000"/>
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
