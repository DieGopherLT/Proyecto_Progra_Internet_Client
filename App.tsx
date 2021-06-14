import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StudentState from './src/context/StudentContext/StudentState';
import RankState from './src/context/RankContext/RankState';

import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import Loading from './src/screens/Loading/Loading';
import Submit from './src/screens/Submit/Submit';

import { RootStackParamList } from './src/interfaces/ReactNavitationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {

    return (
        <StudentState>
            <RankState>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Loading">
                        <Stack.Screen name="Loading" component={ Loading } options={ { header: () => null } }/>
                        <Stack.Screen name="Login" component={ Login } options={ { header: () => null } }/>
                        <Stack.Screen name="Home" component={ Home } options={ { header: () => null } }/>
                        <Stack.Screen name="Submit" component={ Submit } options={ { header: () => null } }/>
                    </Stack.Navigator>
                </NavigationContainer>
            </RankState>
        </StudentState>
    );
};

export default App;
