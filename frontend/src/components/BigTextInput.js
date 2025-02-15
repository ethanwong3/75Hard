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
    width: 360,
    height: 278,
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: '#EBEBEB',
  },

  loginTextField: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    fontSize: 20,
  },
});
