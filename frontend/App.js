import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import {
  useFonts,
  Lexend_400Regular,
  Lexend_700Bold,
} from "@expo-google-fonts/lexend";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./src/navigation/TabNavigator";

export default function App() {
  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
