import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Modal, // <-- Import Modal from react-native
} from "react-native";
import { Image } from "react-native";
import { Colors, Fonts } from "../styles/theme";
import cancelIcon from "../assets/cancelIcon.png";

const DietModal = ({
  visible,
  onClose,
  inputKcal,
  setInputKcal,
  inputProtein,
  setInputProtein,
  inputCarbs,
  setInputCarbs,
  inputFats,
  setInputFats,
  onEat,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible} // Modal is visible only when visible prop is true
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Wrap with TouchableWithoutFeedback so clicking outside closes the modal */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Enter Macros</Text>
                <Pressable onPress={onClose}>
                  <Image style={styles.modalIcon} source={cancelIcon} />
                </Pressable>
              </View>
              <View style={styles.modalTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Calories (kcal)</Text>
                  <Text style={styles.tableHeaderText}>Protein (g)</Text>
                  <Text style={styles.tableHeaderText}>Carbs (g)</Text>
                  <Text style={styles.tableHeaderText}>Fats (g)</Text>
                </View>
                <View style={styles.tableRow}>
                  <TextInput
                    style={styles.tableInput}
                    keyboardType="numeric"
                    placeholder="0"
                    value={inputKcal}
                    onChangeText={setInputKcal}
                  />
                  <TextInput
                    style={styles.tableInput}
                    keyboardType="numeric"
                    placeholder="0"
                    value={inputProtein}
                    onChangeText={setInputProtein}
                  />
                  <TextInput
                    style={styles.tableInput}
                    keyboardType="numeric"
                    placeholder="0"
                    value={inputCarbs}
                    onChangeText={setInputCarbs}
                  />
                  <TextInput
                    style={styles.tableInput}
                    keyboardType="numeric"
                    placeholder="0"
                    value={inputFats}
                    onChangeText={setInputFats}
                  />
                </View>
              </View>
              <Pressable style={styles.modalButton} onPress={onEat}>
                <Text style={styles.modalButtonText}>Eat</Text>
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
  modalTable: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableHeaderText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  tableInput: {
    borderWidth: 1,
    borderColor: Colors.neutral,
    borderRadius: 5,
    padding: 5,
    flex: 1,
    marginHorizontal: 2,
    textAlign: "center",
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

export default DietModal;
