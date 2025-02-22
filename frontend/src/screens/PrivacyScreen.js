import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Switch from "react-switch";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts } from "../styles/theme";

const PrivacyScreen = () => {
  const navigation = useNavigation();
  
  const [isPrivate, setIsPrivate] = useState(false);

  const togglePrivacy = () => {
    setIsPrivate((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy</Text>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.option}>
          <Text style={styles.optionText}>Account Privacy</Text>
          <Switch
            onChange={togglePrivacy}
            checked={isPrivate}
            onColor={Colors.greenlight}
            offColor="#A9A9A9"
            uncheckedIcon={false}
            checkedIcon={false}
            height={24}
            width={48}
            handleDiameter={22}
          />
        </View>
        <Text style={styles.description}>
          When your account is set to public, anyone can view your profile and posts. However, if your account is private, only the followers you approve can see what you share. Certain profile details, such as your profile picture, username, and name, remain visible to everyone regardless of your privacy settings.
        </Text>
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
  description: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
    padding: 25,
  },
});

export default PrivacyScreen;
