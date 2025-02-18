// src/components/DietModal.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
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
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Clicking outside the modal closes it */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Enter Macros</Text>
                <Pressable style={styles.cancelButton} onPress={onClose}>
                  <Image style={styles.modalIcon} source={cancelIcon} />
                </Pressable>
              </View>

              {/* Modal Table: Each macro is a row with label on left and input on right */}
              <View style={styles.modalTable}>
                <View style={styles.modalRow}>
                  <Text
                    style={styles.rowLabel}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Calories (kcal):
                  </Text>
                  <TextInput
                    style={styles.rowInput}
                    keyboardType="numeric"
                    placeholder="0"
                    value={inputKcal}
                    onChangeText={setInputKcal}
                  />
                </View>
                <View style={styles.modalRow}>
                  <Text
                    style={styles.rowLabel}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Protein (g):
                  </Text>
                  <TextInput
                    style={styles.rowInput}
                    keyboardType="numeric"
                    placeholder="0"
                    value={inputProtein}
                    onChangeText={setInputProtein}
                  />
                </View>
                <View style={styles.modalRow}>
                  <Text
                    style={styles.rowLabel}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Carbohydrates (g):
                  </Text>
                  <TextInput
                    style={styles.rowInput}
                    keyboardType="numeric"
                    placeholder="0"
                    value={inputCarbs}
                    onChangeText={setInputCarbs}
                  />
                </View>
                <View style={styles.modalRow}>
                  <Text
                    style={styles.rowLabel}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Fats (g):
                  </Text>
                  <TextInput
                    style={styles.rowInput}
                    keyboardType="numeric"
                    placeholder="0"
                    value={inputFats}
                    onChangeText={setInputFats}
                  />
                </View>
              </View>
              {/* Eat Button */}
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
    width: "90%",
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
  modalTable: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.dark,
    textAlign: "right",
    marginRight: 10,
    flexShrink: 1, // Ensures label doesn't wrap to two lines
  },
  rowInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.neutral,
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
  },
  modalButton: {
    width: "50%",
    marginTop: 20,
    marginBottom: 20,
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

export default DietModal;
