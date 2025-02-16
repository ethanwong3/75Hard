// TODO: color interpolation function in theme.js and used for pie bar
// TODO: today screen popups and change icon containers to pressables
// TODO: create screens for when there is no challenge selected
// TODO: retrieve user data and challenge data

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import PieChart from "react-native-pie-chart";
import * as Progress from "react-native-progress";
import { Picker } from "@react-native-picker/picker";

import { Colors, Fonts } from "../styles/theme";
import dietIcon from "../assets/dietIcon.png";
import waterIcon from "../assets/waterIcon.png";
import studyIcon from "../assets/studyIcon.png";
import workoutIcon from "../assets/workoutIcon.png";
import photoIcon from "../assets/photoIcon.png";
import editIcon from "../assets/editIcon.png";

import dummyStreak from "../assets/dummyStreak.png";
import dummyCalendar from "../assets/dummyCalendar.png";

export default function TodayScreen() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isToggled, setToggled] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState("75 Hard");
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(
    "This is my first time attempting this challenge, and hopefully the last!\n\nInstead of reading 10 pages a day, I will be solving at least 1 leetcode a day."
  );

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const convertToScaleColor = (val) => {
    if (val < 0.2) {
      return Colors.scaleRed;
    } else if (val < 0.4) {
      return Colors.scaleOrange;
    } else if (val < 0.6) {
      return Colors.scaleYellow;
    } else if (val < 0.8) {
      return Colors.scaleLime;
    } else {
      return Colors.scaleGreen;
    }
  };

  // user data
  const [k, p, c, f] = [500, 15, 60, 90]; // getUserMacroProgress();
  const [kcal, protein, carbohydrate, fat] = [1000, 100, 100, 100]; // getUserMacroGoals();
  const [water, study, workout, photo] = [3, 1, 1, 0]; // getUserOtherProgress();
  const [progress, total] = [15, 75]; // getUserChallengeProgress();

  // challenge data
  const challenge = {
    name: "75 Hard",
    rules:
      "You must complete each the following everyday:\n- 45-minute indoor workout.\n- 45-minute outdoor workout.\n- Drink 1 gallon (3.8L) of water.\n- Read 10 pages of a self-improvement book.\n- Take a progress photo.",
  }; //getChallenge();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Toggle Container */}
      <View style={[styles.toggleContainer, styles.shadow]}>
        <Pressable
          style={[styles.toggleButton, !isToggled && styles.invertedButton]}
          onPress={handleToggle}
        >
          <Text style={[styles.toggleText, !isToggled && styles.invertedText]}>
            Today
          </Text>
        </Pressable>
        <Pressable
          style={[styles.toggleButton, isToggled && styles.invertedButton]}
          onPress={handleToggle}
        >
          <Text style={[styles.toggleText, isToggled && styles.invertedText]}>
            Overall
          </Text>
        </Pressable>
      </View>

      {/* Conditional Screen Content */}
      {isToggled ? (
        <View style={styles.subContainer}>
          {/* Streak and Calendar */}
          <View style={styles.overallChallengeContainer}>
            <Image source={dummyStreak} />
            <Image source={dummyCalendar} />
          </View>

          {/* Rules */}
          <View style={styles.overallOtherContainer}>
            <View style={styles.top}>
              <Text style={styles.title}>Rules</Text>
              <Picker
                style={styles.picker}
                selectedValue={selectedChallenge}
                onValueChange={(itemValue) => setSelectedChallenge(itemValue)}
                mode="dropdown"
              >
                {["75 Hard", "75 Medium", "75 Easy"].map((ch) => (
                  <Picker.Item key={ch} label={ch} value={ch} />
                ))}
              </Picker>
            </View>
            <View style={[styles.bottom, styles.shadow]}>
              <Text style={styles.text}>{challenge.rules}</Text>
            </View>
          </View>

          {/* Comments */}
          <View style={styles.overallOtherContainer}>
            <View style={styles.top}>
              <Text style={styles.title}>Comments</Text>
              <Pressable onPress={() => setIsEditing(!isEditing)}>
                <Image style={styles.editIcon} source={editIcon} />
              </Pressable>
            </View>
            <View style={[styles.bottom, styles.shadow]}>
              {isEditing ? (
                <TextInput
                  style={[styles.text, styles.commentInput]}
                  multiline
                  value={editedComment}
                  onChangeText={setEditedComment}
                />
              ) : (
                <Text style={styles.text}>{editedComment}</Text>
              )}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.subContainer}>
          {/* Diet Pie Charts */}
          <View style={styles.allMacroContainer}>
            <View style={styles.specificMacroContainer}>
              <PieChart
                widthAndHeight={120}
                series={[
                  { value: protein - p, color: Colors.neutral },
                  { value: p, color: convertToScaleColor(p / protein) },
                ]}
              />
              <Text style={styles.text}>Protein</Text>
              <Text style={styles.text}>
                {p}/{protein}(g)
              </Text>
            </View>
            <View style={styles.specificMacroContainer}>
              <PieChart
                widthAndHeight={120}
                series={[
                  { value: carbohydrate - c, color: Colors.neutral },
                  { value: c, color: convertToScaleColor(c / carbohydrate) },
                ]}
              />
              <Text style={styles.text}>Carbohydrates</Text>
              <Text style={styles.text}>
                {c}/{carbohydrate}(g)
              </Text>
            </View>
            <View style={styles.specificMacroContainer}>
              <PieChart
                widthAndHeight={120}
                series={[
                  { value: fat - f, color: Colors.neutral },
                  { value: f, color: convertToScaleColor(f / fat) },
                ]}
              />
              <Text style={styles.text}>Fats</Text>
              <Text style={styles.text}>
                {f}/{fat}(g)
              </Text>
            </View>
          </View>

          {/* Bar Progress and Buttons */}
          <View style={styles.allProgressContainer}>
            <View style={styles.specificProgressContainer}>
              <View
                style={styles.progressBarContainer}
                onLayout={(event) => {
                  const { width } = event.nativeEvent.layout;
                  setScreenWidth(width);
                }}
              >
                <Progress.Bar
                  width={screenWidth}
                  height={20}
                  borderRadius={10}
                  progress={k / kcal}
                  color={convertToScaleColor(k / kcal)}
                  unfilledColor="#D9D9D9"
                  borderWidth={0}
                  animated={true}
                />
              </View>
              <View style={[styles.iconContainer, styles.shadow]}>
                <Image style={styles.icon} source={dietIcon} />
              </View>
            </View>

            <View style={styles.specificProgressContainer}>
              <View style={styles.progressBarContainer}>
                <Progress.Bar
                  width={screenWidth}
                  height={20}
                  borderRadius={10}
                  progress={water / 3.8}
                  color={convertToScaleColor(water / 3.8)}
                  unfilledColor="#D9D9D9"
                  borderWidth={0}
                  animated={true}
                />
              </View>
              <View style={[styles.iconContainer, styles.shadow]}>
                <Image style={styles.icon} source={waterIcon} />
              </View>
            </View>

            <View style={styles.specificProgressContainer}>
              <View style={styles.progressBarContainer}>
                <Progress.Bar
                  width={screenWidth}
                  height={20}
                  borderRadius={10}
                  progress={study / 10}
                  color={convertToScaleColor(study / 10)}
                  unfilledColor="#D9D9D9"
                  borderWidth={0}
                  animated={true}
                />
              </View>
              <View style={[styles.iconContainer, styles.shadow]}>
                <Image style={styles.icon} source={studyIcon} />
              </View>
            </View>

            <View style={styles.specificProgressContainer}>
              <View style={styles.progressBarContainer}>
                <Progress.Bar
                  width={screenWidth}
                  height={20}
                  borderRadius={10}
                  progress={workout / 2}
                  color={convertToScaleColor(workout / 2)}
                  unfilledColor="#D9D9D9"
                  borderWidth={0}
                  animated={true}
                />
              </View>
              <View style={[styles.iconContainer, styles.shadow]}>
                <Image style={styles.icon} source={workoutIcon} />
              </View>
            </View>

            <View style={styles.specificProgressContainer}>
              <View style={styles.progressBarContainer}>
                <Progress.Bar
                  width={screenWidth}
                  height={20}
                  borderRadius={10}
                  progress={photo / 1}
                  color={convertToScaleColor(photo / 1)}
                  unfilledColor="#D9D9D9"
                  borderWidth={0}
                  animated={true}
                />
              </View>
              <View style={[styles.iconContainer, styles.shadow]}>
                <Image style={styles.icon} source={photoIcon} />
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    rowGap: 25,
  },
  subContainer: {
    width: "100%",
    rowGap: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  toggleText: {
    fontSize: 20,
    fontFamily: Fonts.regular,
    color: Colors.dark,
  },
  invertedButton: {
    backgroundColor: Colors.blueLight,
  },
  invertedText: {
    color: Colors.light,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  allMacroContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  specificMacroContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.dark,
  },
  allProgressContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: 25,
  },
  specificProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarContainer: {
    flex: 1,
    marginRight: 20,
  },
  iconContainer: {
    backgroundColor: Colors.light,
    height: 60,
    width: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
  overallChallengeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  overallOtherContainer: {
    flexDirection: "column",
    rowGap: 10,
  },
  top: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottom: {
    backgroundColor: Colors.light,
    borderRadius: 20,
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.dark,
  },
  picker: {
    backgroundColor: "red",
    height: 40,
    width: 150,
    color: Colors.dark,
    fontFamily: Fonts.regular,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  commentInput: {
    height: 100,
    textAlignVertical: "top",
  },
});
