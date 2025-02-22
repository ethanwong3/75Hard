import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts } from "../styles/theme";
import avatarImage from "../../assets/avatar.png";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image source={avatarImage} style={styles.avatar} />
        <TouchableOpacity>
          <Text style={styles.changePictureText}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} />

        <Text style={styles.label}>Bio</Text>
        <TextInput 
          style={[styles.input, styles.bioInput]} 
          value={bio} 
          onChangeText={setBio} 
          multiline 
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
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
  imageContainer: { 
    alignItems: "center", 
    marginVertical: 20 
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: "black",
  },
  changePictureText: { 
    color: Colors.blueLight,
    fontSize: 20, 
    fontFamily: Fonts.bold, 
    marginTop: 15, 
    marginBottom: 20
  },
  inputContainer: { 
    paddingHorizontal: 20 
  },
  label: { 
    fontSize: 20, 
    fontFamily: Fonts.medium, 
    marginBottom: 8 
  },
  input: { 
    backgroundColor: "#fff", 
    padding: 12, 
    borderRadius: 8, 
    fontSize: 20, 
    marginBottom: 12 
  },
  bioInput: { 
    height: 80, 
    textAlignVertical: "top" 
  },
  saveButton: { 
    backgroundColor: "#4CAF50", 
    padding: 14, 
    alignItems: "center", 
    borderRadius: 8, 
    margin: 20 
  },
  saveButtonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontFamily: Fonts.bold 
  }
});

export default EditProfileScreen;
