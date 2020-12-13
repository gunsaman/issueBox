
import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FirstPage from '../Screens/Todo';
import SecondPage from '../Screens/Doing';
import ThirdPage from '../Screens/Done';

const Tab = createMaterialTopTabNavigator();
export default function Route() {
    return (
      <Tab.Navigator
        initialRouteName="FirstPage"
        tabBarOptions={{
          activeTintColor: '#FFFFFF',
          inactiveTintColor: '#F8F8F8',
          style: {
            backgroundColor: '#633689',
          },
          labelStyle: {
            textAlign: 'center',
          },
          indicatorStyle: {
            borderBottomColor: '#87B56A',
            borderBottomWidth: 2,
          },
        }}>
        <Tab.Screen
          name="FirstPage"
          component={FirstPage}
          options={{
            tabBarLabel: 'Issues',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons
            //       name="home"
            //       color={color}
            //       size={size}
            //     />
            // ),
          }}  />
        <Tab.Screen
          name="SecondPage"
          component={SecondPage}
          options={{
            tabBarLabel: 'Doing',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons
            //       name="settings"
            //       color={color}
            //       size={size}
            //     />
            // ),
          }} />
          <Tab.Screen
          name="ThirdPage"
          component={ThirdPage}
          options={{
            tabBarLabel: 'Done',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons
            //       name="settings"
            //       color={color}
            //       size={size}
            //     />
            // ),
          }} />
      </Tab.Navigator>
    );
  }
  