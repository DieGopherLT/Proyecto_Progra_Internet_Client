import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StudentState from './src/context/StudentContext/StudentState';
import Login from './src/screens/Login';
import Home from './src/screens/Home';

import { RootStackParamList } from './src/interfaces/ReactNavitationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
	return (
		<SafeAreaProvider>
			<StudentState>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Login'>
						<Stack.Screen name='Login' component={ Login } />
						<Stack.Screen name='Home' component={ Home } options={{headerLeft: () => null }}/>
					</Stack.Navigator>
				</NavigationContainer>
			</StudentState>
		</SafeAreaProvider>
	)
}

export default App;