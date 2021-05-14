/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import Drawer from '../components/drawer/Drawer';
import DrawerContent from '../components/drawer/DrawerContent';

import useDrawer from '../hooks/useDrawer';


const Home: React.FC = () => {

    const { toggleOpen, open, drawerContent } = useDrawer(DrawerContent);

    return (
        <Drawer
            open={ open }
            drawerContent={ drawerContent() }
        >
            <View style={ styles.navBar }>
                <View style={ styles.menuContainer }>
                    <Icon
                        name="list"
                        type="foundation"
                        onPress={ toggleOpen }
                        size={ 50 }
                        color="#FFF"
                    />
                    <Text style={ styles.tittle }>Actividad siete - Progra Internet</Text>
                </View>
            </View>

            <View style={ styles.textContainer }>
                <Text style={ styles.text }>Pantalla de inicio, abrir menu lateral</Text>
            </View>
        </Drawer>
    );

};

const styles = StyleSheet.create({
    menuContainer: {
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tittle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    navBar: {
        padding: 10,
        backgroundColor: '#12e0d3',
    },
    textContainer: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        marginVertical: 5,
        fontSize: 16,
    },
});

export default Home;

