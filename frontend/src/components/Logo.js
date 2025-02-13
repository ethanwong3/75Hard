import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const logo = require('../../assets/logo.png');


export default function Logo({ onPress }) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <Image source={logo} />
        </TouchableOpacity>
      );
    }
    
    const styles = StyleSheet.create({
      buttonContainer: {
        height: 100,
        width: 100,
      },
    });
    
