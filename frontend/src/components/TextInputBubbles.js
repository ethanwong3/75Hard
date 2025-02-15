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
        style={styles.loginTextField}
        secureTextEntry={dotDisplay}
        placeholder={input}
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  loginTextFrame: {
    width: 330,
    height: 45,
    borderRadius: 40,
    backgroundColor: '#EEEBEB',
    justifyContent: 'center',
  },

  loginTextField: {
    paddingHorizontal: 20,
    fontSize: 20,
  },
});
