import { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

export default function BigNumberInput({
  input,
  dotDisplay,
  value,
  setValue,
  keyboardType,
}) {
  return (
    <View
      style={styles.loginTextFrame}
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
    width: 356,
    height: 119,
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: '#EBEBEB',
  },

  loginTextField: {
    justifySelf: 'center',
    alignSelf: 'center',
    paddingTop: 20,
    fontSize: 50,
    letterSpacing: 4,
    color: '#A79E9E'
  },
});
