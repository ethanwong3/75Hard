import React from "react";
import { Image, View, Text, StyleSheet, Presable, Pressable } from 'react-native';

const logo = require('../../assets/logo.png');


export default function Logo({ onPress }) {
    return (
        <Pressable style={styles.buttonContainer} onPress={onPress}>
          <Image source={logo} />
        </Pressable>
      );
    }
    
    const styles = StyleSheet.create({
      buttonContainer: {
        height: 100,
        width: 100,
      },
    });
    
