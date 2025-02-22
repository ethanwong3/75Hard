import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Switch from "react-switch";
import { Colors, Fonts } from "../styles/theme";

const NotificationScreen = () => {
  const navigation = useNavigation();

  // State for toggles
  const [notifications, setNotifications] = useState({
    follows: true,
    likes: true,
    comments: true,
    everything: true,
  });

  // Toggle function
  const toggleSwitch = (key) => {
    if (key === "everything") {
      const newState = !notifications.everything;
      setNotifications({
        follows: newState,
        likes: newState,
        comments: newState,
        everything: newState,
      });
    } else {
      const newState = { ...notifications, [key]: !notifications[key] };
      newState.everything = newState.follows && newState.likes && newState.comments;
      setNotifications(newState);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>

      {/* Notification Options */}
      <View style={styles.content}>
        {Object.keys(notifications).map((key, index) => (
          <View key={index} style={styles.option}>
            <Text style={styles.optionText}>
              {key === "follows"
                ? "Follows"
                : key === "likes"
                ? "Likes on your Posts"
                : key === "comments"
                ? "Comments on your Posts"
                : "Everything"}
            </Text>
            <Switch
              onChange={() => toggleSwitch(key)}
              checked={notifications[key]}
              onColor={Colors.greenlight}
              offColor="#A9A9A9"
              uncheckedIcon={false}
              checkedIcon={false}
              handleDiameter={20}
              height={24}
              width={48}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    height: 120,
    backgroundColor: Colors.blueLight,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.light,
    textAlign: "center",
    flex: 1,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#D3D3D3",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
  },
  optionText: {
    fontSize: 24,
    fontWeight: 500,
  },
});

export default NotificationScreen;