import React from "react";
import { View, Text, StyleSheet } from "react-native";



export default function TitleText({ name }) {
    return (
        <View style={styles.box}>
            <Text style={styles.heading}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
    },
  
    heading: {
      fontSize: 30,
    },
  });
  
