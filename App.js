
import 'react-native-gesture-handler';
import {ContextProvider} from './TodoContext';
import * as React from 'react';
import {useState} from 'react';
import {  NavigationContainer} from '@react-navigation/native';
import {  createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen';
import Router from './Route/Route'


function App() {
  
  return (
   
    <MainScreen />
  
  
  );
}

export default App;