
import 'react-native-gesture-handler';

import * as React from 'react';
import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createStackNavigator
} from '@react-navigation/stack';

import Router from './Route/Route'


const Stack = createStackNavigator();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Hello"
        screenOptions={{
          headerStyle: { backgroundColor: '#633689' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="TabStack"
          component={Router}
          options={{ title: 'Dashboard' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;