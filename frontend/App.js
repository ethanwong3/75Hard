import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import TabNavigator from "./src/navigation/TabNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen1 from "./src/screens/SignUpScreen1";
import SignUpScreen2 from "./src/screens/SignUpScreen2";
import SignUpScreen3 from "./src/screens/SignUpScreen3";
import ForgotPassword1 from "./src/screens/ForgotPassword1";
import ForgotPasssword2 from "./src/screens/ForgotPassword2";
import ResetPassword from "./src/screens/ResetPassword";

export default function App() {
  return (
    <NavigationContainer>
      <ResetPassword/>
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