import React from 'react';
import { View } from 'react-native';
import RootStackParamList from './src/RootStackParamList';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/HomePage';
import { NavigationContainer } from '@react-navigation/native';

// fonts
import { 
  CedarvilleCursive_400Regular, useFonts 
} from '@expo-google-fonts/cedarville-cursive'
import {
  Taviraj_400Regular,
  Taviraj_600SemiBold_Italic,
} from '@expo-google-fonts/taviraj'
import { 
  BungeeShade_400Regular 
} from '@expo-google-fonts/bungee-shade'
import PlayPage from './src/PlayPage';


const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  let [fontsLoaded] = useFonts({
    CedarvilleCursive_400Regular,
    Taviraj_400Regular,
    Taviraj_600SemiBold_Italic,  
    BungeeShade_400Regular
  });
  if (!fontsLoaded) {
    return <View>
      
    </View>
  }
  return (
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Group screenOptions={{
            headerShown: false
          }}>
            <RootStack.Screen name="Home" component={HomePage} />
            <RootStack.Screen name="Play" component={PlayPage} />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
  );
}
