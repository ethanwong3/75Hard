import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Activity</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { fontSize: 24, fontWeight: "bold" },
});
