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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} />

        <Text style={styles.label}>Bio</Text>
        <TextInput 
          style={[styles.input, styles.bioInput]} 
          value={bio} 
          onChangeText={setBio} 
          multiline 
        />
      </View>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 8
  },
  inputContainer: { 
    paddingHorizontal: 20 
  },
  label: { 
    fontSize: 18, 
    fontFamily: Fonts.medium, 
    marginBottom: 8,
    fontWeight: "bold"
  },
  input: { 
    backgroundColor: "#fff", 
    padding: 12, 
    borderRadius: 8, 
    fontSize: 18, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  bioInput: { 
    height: 65, 
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ccc"
  },
  /* Footer */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    alignItems: "center",
  },
  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default EditProfileScreen;
