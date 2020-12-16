
import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import {Icon} from 'react-native-elements';
import FirstPage from '../Screens/Todo';
import SecondPage from '../Screens/Doing';
import ThirdPage from '../Screens/Done';

const Tab = createMaterialTopTabNavigator();
export default function Route() {
    return (
      <Tab.Navigator
        initialRouteName="FirstPage"
        tabBarOptions={{
          
          activeTintColor: '#fffaf0',
          inactiveTintColor: '#006400',
          style: {
            backgroundColor: '#3cb371',
          },
          labelStyle: {
            textAlign: 'center',
          },
          indicatorStyle: {
            borderBottomColor: '#9370db',
            borderBottomWidth: 4,
          },
        }}>
        <Tab.Screen
          name="FirstPage"
          component={FirstPage}
          options={{
            tabBarLabel: 'Issues',
            tabBarIcon: () => (
                <MaterialIcons name="home" size={18} color={'blue'} />
            ),
          }}  />
        <Tab.Screen
          name="SecondPage"
          component={SecondPage}
          options={{
            tabBarLabel: 'Doing',
            }} />
          <Tab.Screen
          name="ThirdPage"
          component={ThirdPage}
          options={{
            tabBarLabel: 'Done',
          }} />
      </Tab.Navigator>
    );
  }
  