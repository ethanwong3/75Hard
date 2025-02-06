import React from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Fonts } from "../styles/theme";
// import LinearGradient from "react-native-linear-gradient"; // gradient not working atm

import TodayScreen from "../screens/TodayScreen";
import ActivityScreen from "../screens/ActivityScreen";
import UploadScreen from "../screens/UploadScreen";
import SocialScreen from "../screens/SocialScreen";
import ProfileScreen from "../screens/ProfileScreen";

import logo from "../assets/logo.png";
import todayIcon from "../assets/todayIcon.png";
import activityIcon from "../assets/activityIcon.png";
import uploadIcon from "../assets/uploadIcon_.png"; // need to combine the two parts
import socialIcon from "../assets/socialIcon.png";
import profileIcon from "../assets/profileIcon.png";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: Colors.light,
        headerStyle: {
          backgroundColor: Colors.blueLight,
        },
        headerTitleStyle: {
          fontFamily: Fonts.bold,
          fontSize: 24,
        },
        headerTitleContainerStyle: {
          paddingHorizontal: 20,
        },
        tabBarActiveTintColor: Colors.blueLight,
        tabBarInactiveTintColor: Colors.dark,
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: Fonts.regular,
        },
        headerLeft: () => (
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        ),
      }}
    >
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          headerTitle: "Today",
          tabBarLabel: "Today",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={todayIcon}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerTitle: "Activity",
          tabBarLabel: "Activity",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={activityIcon}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          headerTitle: "Upload",
          tabBarLabel: "Upload",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={uploadIcon}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          headerTitle: "Social",
          tabBarLabel: "Social",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={socialIcon}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={profileIcon}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
