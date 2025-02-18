import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Modal, // <-- Import Modal
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
    <Modal
      transparent={true}
      visible={visible} // Only visible when true
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Drink Water</Text>
                <Pressable style={styles.cancelButton} onPress={onClose}>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    width: "70%",
    backgroundColor: Colors.light,
    borderRadius: 20,
    alignItems: "center",
  },
  modalHeader: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blueLight,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "relative",
  },
  cancelButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalHeaderText: {
    fontSize: 20,
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
    width: "50%",
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: Colors.blueLight,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.light,
  },
});

export default WaterModal;
