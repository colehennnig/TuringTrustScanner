import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EntryPage from './pages/EntryPage';
import ScannerPage from './pages/ScannerPage';
import SettingsPage from './pages/SettingsPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Entry" options={{headerShown: false}} component={EntryPage} initialParams={{ asset: null }}/>
          <Stack.Screen name="Scanner" options={{headerShown: false}} component={ScannerPage}/>
          <Stack.Screen name="Settings" options={{headerShown: false}} component={SettingsPage}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
