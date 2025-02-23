import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Switch from "react-switch";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts } from "../styles/theme";

const AccessibilityScreen = () => {
  const navigation = useNavigation();
  
  const [settings, setSettings] = useState({
    darkMode: false,
    hapticFeedback: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Accessibility</Text>
      </View>
      
      {/* Options */}
      <View style={styles.content}>
        {Object.keys(settings).map((key, index) => (
          <View key={index} style={styles.option}>
            <Text style={styles.optionText}>
              {key === "darkMode" ? "Toggle Dark Mode" : "Haptic Feedback"}
            </Text>
            <Switch
              onChange={() => toggleSetting(key)}
              checked={settings[key]}
              onColor={Colors.greenlight}
              offColor="#A9A9A9"
              uncheckedIcon={false}
              checkedIcon={false}
              height={24}
              width={48}
              handleDiameter={22}
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

export default AccessibilityScreen;
