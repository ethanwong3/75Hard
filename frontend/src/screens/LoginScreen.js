import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WavySquare from "../components/WavySquare";
import TitleText from "../components/TitleText";
import MiniButtonHollow from "../components/MiniButtonHollow";
import SignInWithGoogle from "../components/SignInWithGoogle";
import TextInputBubbles from "../components/TextInputBubbles";
import RememberMe from "../components/RememberMe";
import ForgotPassword from "../components/ForgotPassword";
import NewUser from "../components/NewUser";
import OrLoginPage from "../components/OrLoginPage";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WavySquare style={styles.wavySquareStyles} height={260} top={220}/>
      <View style={{padding: 40}}/>
      
      <View style={styles.login}>
        <TitleText name="Login"/>
      </View>

      <View style={styles.username}>
        <TextInputBubbles input="Username"/>
      </View>
    
      <View style={styles.password}>
        <TextInputBubbles input="Password" dotDisplay={true}/>
      </View>

      <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center', paddingBottom: 20}}>
        <View style={{paddingRight: 100}}><RememberMe/></View>
        <View><ForgotPassword/></View>
      </View>


      <View style={styles.login}>
        <MiniButtonHollow text='Login'/>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 10,}}>
        <NewUser/>
      </View>

      <View>
        <OrLoginPage/>
      </View>


      <View style={styles.signInWithGoogle}>
        <SignInWithGoogle/>
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
    paddingBottom: 20,
  },

  password: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },



  login: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },


  signInWithGoogle: {
    paddingTop: 10,
    alignItems: 'center',
  },

  wavySquareStyles: {
    position: 'relative',
  }

 
});