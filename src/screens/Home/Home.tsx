/* eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { LinearProgress } from 'react-native-elements';

import Navbar from '../../components/Navbar/Navbar';
import Drawer from '../../components/drawer/Drawer';
import DrawerContent from '../../components/drawer/DrawerContent/DrawerContent';
import List from '../../components/RankList/List/List';

import useFetch from '../../hooks/useFetch';
import useDrawer from '../../hooks/useDrawer';

import RankContext from '../../context/RankContext/RankContext';
import StudentContext from '../../context/StudentContext/StudentContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../interfaces/ReactNavitationTypes';
import { RankData } from '../../interfaces/Responses';

import { styles } from './styles';
import Button from '../../components/Button';

interface HomeProps {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {

    const { dataLoaded, studentRankList, studentDidUpdateData, setRankList, changeData } = useContext(RankContext);
    const { student } = useContext(StudentContext);
    const { code } = student;

    // const [studentRankList, setStudentRankList] = useState<StudentPlace[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const { open, toggleOpen, drawerContent } = useDrawer(DrawerContent);

    const [rankDataRequest] = useFetch<RankData>({
        url: `https://progra-internet-server.herokuapp.com/api/student/${ code }`,
        method: 'GET',
    });

    useEffect(() => {
        const effect = async () => {
            await fetchRankData();
        }
        effect();
    }, [studentDidUpdateData]);

    const fetchRankData = async () => {
        if(studentDidUpdateData){
            try {
                const { positionList, studentPlace } = await rankDataRequest();
                const payload = (studentPlace) ? [...positionList, studentPlace] : [...positionList];
                setRankList(payload);
                setRefreshing(false);
            } catch(e) {
                console.log(e);
                setRankList([]);
            }
        }
    };

    useEffect(() => {
        const preventLeaving = () => {
            navigation.addListener('beforeRemove', e => {
                e.preventDefault();
            });
        };
        preventLeaving();
    }, []);

    const goToSubmit = () => navigation.navigate('Submit');

    const onRefresh = () => {
        setRefreshing(true);
        changeData();
    }

    return (
        <Drawer
            open={ open }
            drawerContent={ drawerContent() }
        >
            <SafeAreaView>
                <Navbar toggleOpen={ toggleOpen }/>
                    {
                        dataLoaded  
                            ?
                                (
                                    <ScrollView
                                        refreshControl={
                                            <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
                                        }
                                    >
                                        <View style={ [styles.rankListContainer] }>
                                            <List
                                                studentRankList={ studentRankList }
                                            />
                                        </View>

                                        <Button
                                            backgroundColor="#f0ad4e"
                                            text="Subir resultados"
                                            onPress={ goToSubmit }
                                            containerStyles={ styles.goSubmitButtonContainer }
                                        />
                                    </ScrollView>
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
            </SafeAreaView>
        </Drawer>
    );
};

export default Home;

