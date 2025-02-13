import { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

export default function TextInputBubbles({
  input,
  dotDisplay,
  value,
  setValue,
  keyboardType,
}) {
  return (
    <View
      style={[styles.loginTextFrame, styles.boxShadow, styles.androidShadow]}
    >
      <TextInput
        secureTextEntry={dotDisplay}
        placeholder={input}
        style={styles.loginTextField}
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  loginTextFrame: {
    width: '100%',
    height: 45,
    borderColor: 'white',
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  boxShadow: {
    shadowColor: '#3333333',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  androidShadow: {
    elevation: 10,
    shadowColor: 'black',
  },
  loginTextField: {
    paddingHorizontal: 10,
  },
});
