import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import {
  useFonts,
  Lexend_400Regular,
  Lexend_700Bold,
} from "@expo-google-fonts/lexend";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useAuth from "./src/hooks/useAuth";
import TabNavigator from "./src/navigation/TabNavigator";
import SettingsStack from "./src/navigation/SettingsStack";

const Stack = createStackNavigator();
import AuthStack from "./src/navigation/AuthStack";

export default function App() {
  const { user, loading } = useAuth();
  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });

  if (loading) {
    return null; // REPLACE WITH LOADING SCREEN
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="SettingsStack" component={SettingsStack} />
      </Stack.Navigator>
      {user ? <TabNavigator /> : <AuthStack />}
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
