// src/components/WaterModal.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "react-native";
import { Colors, Fonts } from "../styles/theme";
import cancelIcon from "../assets/cancelIcon.png";

const WaterModal = ({
  visible,
  onClose,
  waterAmount,
  setWaterAmount,
  onDrink,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Drink Water</Text>
              <Pressable onPress={onClose}>
                <Image style={styles.modalIcon} source={cancelIcon} />
              </Pressable>
            </View>
            <TextInput
              style={styles.waterInput}
              placeholder="Enter water amount (ml)"
              keyboardType="numeric"
              value={waterAmount}
              onChangeText={setWaterAmount}
            />
            <Pressable style={styles.modalButton} onPress={onDrink}>
              <Text style={styles.modalButtonText}>Drink</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: Colors.light,
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.blueLight,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeaderText: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.light,
  },
  modalIcon: {
    width: 24,
    height: 24,
  },
  waterInput: {
    borderWidth: 1,
    borderColor: Colors.neutral,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    textAlign: "center",
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.dark,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: Colors.blueLight,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.light,
  },
});

export default WaterModal;
