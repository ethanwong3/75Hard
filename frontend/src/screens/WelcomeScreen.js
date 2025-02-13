import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WavySquare from "../components/WavySquare";
import TitleText from "../components/TitleText";
import MiniButton from "../components/MiniButton";
import MiniButtonHollow from "../components/MiniButtonHollow";


export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <WavySquare style={styles.wavySquareStyles} height={260} top={220}>
      </WavySquare>
      <View style={{padding: 90}}/>
      
      <View style={styles.welcomeText}>
        <TitleText name="Welcome!"/>
      </View>

      <View style={styles.createAccount}>
        <MiniButton text='Create Account'/>
      </View>

      <View style={styles.login}>
        <MiniButtonHollow text='Login'/>
      </View>

      <View>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  createAccount: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  login: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeText: {
    alignItems: 'center',
    justifyAlign: 'center',
    paddingBottom: 30,

  },

  wavySquareStyles: {
    flex: 3,
  }

 
});