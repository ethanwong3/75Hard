import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Colors, Fonts } from "../styles/theme";

export default function TodayScreen() {
  // add conditional logic that swaps screens and dynamically aplpies inversion
  const [isToggled, setToggled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Pressable
          style={styles.toggleButton}
          onPress={() =>
            Alert.alert("Alert Title", "This is an alert message!")
          }
        >
          <Text style={styles.toggleText}>Today</Text>
        </Pressable>
        <Pressable
          style={[styles.toggleButton, styles.invertedButton]}
          onPress={() =>
            Alert.alert("Alert Title", "This is an alert message!")
          }
        >
          <Text style={[styles.toggleText, styles.invertedText]}>Overall</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  toggleText: {
    fontSize: 20,
    fontFamily: Fonts.regular,
    color: Colors.dark,
  },
  invertedButton: {
    backgroundColor: Colors.blueLight,
  },
  invertedText: {
    color: Colors.light,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
