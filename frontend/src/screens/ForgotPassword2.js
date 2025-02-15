import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WavySquareLogoLess from "../components/WavySquareLogoLess";
import TitleText from "../components/TitleText";
import MiniButtonHollow from "../components/MiniButtonHollow";
import SignInWithGoogle from "../components/SignInWithGoogle";
import TextInputBubbles from "../components/TextInputBubbles";
import RememberMe from "../components/RememberMe";
import ForgotPassword from "../components/ForgotPassword";
import NewUser from "../components/NewUser";
import OrLoginPage from "../components/OrLoginPage";
import BigTextInput from "../components/BigTextInput";


export default function ForgotPasssword2() {
  return (
    <SafeAreaView style={styles.container}>
      <WavySquareLogoLess style={styles.wavySquareStyles} height={100} width={100}/>
      <View style={{padding: 120}}/>
  
      <View style={styles.signUp}>
        <TitleText name="Forgot Password"/>
      </View>

      <View style={styles.signUp}>
        <Text>A recovery email has been sent if there is an account associated with the email.</Text>
      </View>

      <View style={styles.username}>
        <TextInputBubbles input="Email"/>
      </View>
      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
  },

  username: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 25,
  },

  password: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },

  signUp: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },


  wavySquareStyles: {
    position: 'relative',
  }

 
});