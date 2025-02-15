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



export default function SignUpScreen1() {
  return (
    <SafeAreaView style={styles.container}>
      <WavySquareLogoLess style={styles.wavySquareStyles} height={100} width={100}/>
      <View style={{padding: 40}}/>
      
      <View style={styles.signUp}>
        <TitleText name="Sign Up"/>
      </View>

      <View style={styles.username}>
        <TextInputBubbles input="Full Name"/>
      </View>
    
      <View style={styles.username}>
        <TextInputBubbles input="Email"/>
      </View>

      <View style={styles.username}>
        <TextInputBubbles input="Username"/>
      </View>

      <View style={styles.username}>
        <TextInputBubbles input="Password" dotDisplay={true}/>
      </View>
    
      <View style={styles.username}>
        <TextInputBubbles input="Confirm Password" dotDisplay={true}/>
      </View>

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <MiniButtonHollow text="Next"/>
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
    paddingBottom: 50,
  },


  signInWithGoogle: {
    paddingTop: 10,
    alignItems: 'center',
  },

  wavySquareStyles: {
    position: 'relative',
  }

 
});