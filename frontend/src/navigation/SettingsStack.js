import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AccessibilityScreen from "../screens/AccessibilityScreen";
import PrivacyScreen from "../screens/PrivacyScreen";

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;