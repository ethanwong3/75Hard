// MacroTargetsScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts } from "../styles/theme";

const MacroTargetsScreen = () => {
  const navigation = useNavigation();
  const [macros, setMacros] = useState({ protein: "", netCarbs: "", fat: "" });

  const calculateCalories = () => {
    const protein = parseFloat(macros.protein) || 0;
    const carbs = parseFloat(macros.netCarbs) || 0;
    const fat = parseFloat(macros.fat) || 0;
    return protein * 4 + carbs * 4 + fat * 9;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Marco Targets</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.content}>
        {Object.keys(macros).map((key, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)} (g)</Text>
            <TextInput
              style={styles.input}
              value={macros[key]}
              onChangeText={(text) => setMacros({ ...macros, [key]: text })}
              keyboardType="numeric"
              placeholder={`Enter ${key}`}
            />
          </View>
        ))}
        <Text style={styles.result}>Total Calories: {calculateCalories()} kcal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  header: { height: 120, backgroundColor: Colors.blueLight, justifyContent: "flex-end", paddingHorizontal: 20, flexDirection: "row", alignItems: "center" },
  backButton: { position: "absolute", left: 20, bottom: 20 },
  headerTitle: { fontSize: 24, fontFamily: Fonts.bold, color: Colors.light, textAlign: "center", flex: 1 },
  content: { padding: 20 },
  inputContainer: { marginBottom: 15 },
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
  result: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
});

export default MacroTargetsScreen;
