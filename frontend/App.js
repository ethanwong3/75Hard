import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import TabNavigator from "./src/navigation/TabNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen";


export default function App() {
  return (
    <NavigationContainer>
      <WelcomeScreen></WelcomeScreen>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // rest of the styles
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    // change the color property for better output
    color: '#fff',
    textAlign: 'center',
    marginTop: 35
  }
});