import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts } from "../styles/theme";

const StatsScreen = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState({
    age: "",
    sex: "Male",
    weight: "",
    height: "",
  });

  const calculateBMI = () => {
    const weight = parseFloat(stats.weight);
    const height = parseFloat(stats.height) / 100;
    if (!isNaN(weight) && !isNaN(height) && height > 0) {
      return (weight / (height * height)).toFixed(2);
    }
    return "";
  };

  const calculateBodyFat = () => {
    const bmi = parseFloat(calculateBMI());
    const age = parseInt(stats.age);
    if (!isNaN(bmi) && !isNaN(age)) {
      if (stats.sex === "Male") {
        return (1.20 * bmi + 0.23 * age - 16.2).toFixed(2);
      } else {
        return (1.20 * bmi + 0.23 * age - 5.4).toFixed(2);
      }
    }
    return "";
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stats</Text>
      </View>

      {/* Stats Input */}
      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={stats.age}
            onChangeText={(text) => setStats({ ...stats, age: text })}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sex</Text>
          <Picker
            selectedValue={stats.sex}
            style={styles.picker}
            onValueChange={(itemValue) => setStats({ ...stats, sex: itemValue })}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={stats.weight}
            onChangeText={(text) => setStats({ ...stats, weight: text })}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={stats.height}
            onChangeText={(text) => setStats({ ...stats, height: text })}
          />
        </View>
        <View style={styles.resultGroup}>
          <Text style={styles.label}>Body Mass Index (BMI): {calculateBMI()}</Text>
        </View>
        <View style={styles.resultGroup}>
          <Text style={styles.label}>Body Fat Percentage: {calculateBodyFat()}%</Text>
        </View>
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
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
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
  picker: {
    height: 50,
    width: "100%",
  },
  resultGroup: {
    marginTop: 10,
  },
});

export default StatsScreen;