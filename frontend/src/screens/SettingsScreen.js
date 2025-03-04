import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts } from "../styles/theme";

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.optionText}>Edit Profile</Text>
          <Icon name="chevron-right" size={28} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate("Stats")}
        >
          <Text style={styles.optionText}>Edit Stats</Text>
          <Icon name="chevron-right" size={28} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate("MacroTargets")}
        >
          <Text style={styles.optionText}>Macro Targets</Text>
          <Icon name="chevron-right" size={28} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate("Notification")}
        >
          <Text style={styles.optionText}>Notification</Text>
          <Icon name="chevron-right" size={28} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate("Accessibility")}
        >
          <Text style={styles.optionText}>Accessibility</Text>
          <Icon name="chevron-right" size={28} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate("Privacy")}
        >
          <Text style={styles.optionText}>Privacy</Text>
          <Icon name="chevron-right" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Logout & Delete Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  /* Custom Header */
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
  /* Settings List */
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
    fontWeight: "500",
  },
  /* Footer */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  logoutButton: {
    backgroundColor: "#333",
    paddingVertical: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: "#E63946",
    paddingVertical: 15,
    alignItems: "center",
  },
  deleteText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SettingsScreen;
