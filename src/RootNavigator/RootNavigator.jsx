import React from 'react';


import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Game from '../components/Game'
import Home from '../components/Home'

enableScreens();
const Stack = createNativeStackNavigator();

const  MyStack = () => {
  return (
      <>
    <Stack.Navigator 
    screenOptions={{
        headerMode: null,
        headerShown:false,
        initialRouteName:"Home"
      }}>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name="StartGame" component={Game} />
    </Stack.Navigator>
    </>
  );
}
export default MyStack