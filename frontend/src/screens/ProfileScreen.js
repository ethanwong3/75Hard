import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import catImage from "../../assets/cat.png";
import clogImage from "../../assets/clog.png";

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Clog Icon to access Settings */}
      <TouchableOpacity onPress={() => navigation.navigate("SettingsStack")} style={styles.clogButton}>
        <Image source={clogImage} style={styles.clogIcon} />
      </TouchableOpacity>

      {/* Avatar and User Info */}
      <View style={styles.profileSection}>
        <Image source={catImage} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>@Taejin1</Text>
          <Text style={styles.name}>Jonathan Pham</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Friends</Text>
              <Text style={styles.statValue}>100</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Days</Text>
              <Text style={styles.statValue}>100</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bio Section */}
      <TextInput placeholder="Bio" style={styles.bioInput} />

      {/* Grid Layout for Boxes */}
      <View style={styles.gridContainer}>
        {[...Array(9)].map((_, index) => (
          <View key={index} style={styles.gridBox} />
        ))}
      </View>
    </View>
  );
}

const styles = {
  container: {
    padding: 30,
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
  clogButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  clogIcon: {
    width: 40,
    height: 40,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: "black",
  },
  userInfo: {
    marginLeft: 40,
  },
  username: {
    fontWeight: "bold",
    fontSize: 24,
  },
  name: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  statBox: {
    backgroundColor: "#4da6ff",
    padding: 15,
    borderRadius: 10,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 85,
    height: 85,
  },
  statLabel: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  statValue: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  bioInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    height: 75,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "space-between",
  },
  gridBox: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#4da6ff",
    borderRadius: 10,
    marginBottom: 15,
  },
};