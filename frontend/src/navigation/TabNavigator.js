import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TodayScreen from "../screens/TodayScreen";
import ActivityScreen from "../screens/ActivityScreen";
import UploadScreen from "../screens/UploadScreen";
import SocialScreen from "../screens/SocialScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{ headerTitle: "Today", tabBarLabel: "Today" }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ headerTitle: "Activity", tabBarLabel: "Activity" }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{ headerTitle: "Upload", tabBarLabel: "Upload" }}
      />
      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{ headerTitle: "Social", tabBarLabel: "Social" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: "Profile", tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}
