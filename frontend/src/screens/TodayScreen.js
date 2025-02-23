// FRONTEND
// TODO: create screens for when there is no challenge selected

// BACKEND
// TODO: auth => user models => user routes + user controllers => frontend API

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
import DropDownPicker from "react-native-dropdown-picker";

import DietModal from "../components/DietModal";
import WaterModal from "../components/WaterModal";

import { Colors, Fonts } from "../styles/theme";
import dietIcon from "../assets/dietIcon.png";
import waterIcon from "../assets/waterIcon.png";
import studyIcon from "../assets/studyIcon.png";
import workoutIcon from "../assets/workoutIcon.png";
import photoIcon from "../assets/photoIcon.png";
import editIcon from "../assets/editIcon.png";
import saveIcon from "../assets/saveIcon.png";
import cancelIcon from "../assets/cancelIcon.png";
import fireIcon from "../assets/fireIcon.png";

function Streak({ progress }) {
  return (
    <View style={styles.streakContainer}>
      <Image source={fireIcon} style={styles.fireIcon} resizeMode="contain" />
      <Text style={styles.streakText}>{progress}</Text>
    </View>
  );
}

function Calendar({ progress, total }) {
  const cells = Array.from({ length: total }, (_, i) => i);
  return (
    <View style={styles.calendarGrid}>
      {cells.map((cell) => (
        <View
          key={cell}
          style={[
            styles.calendarCell,
            cell < progress
              ? { backgroundColor: Colors.scaleGreen }
              : { backgroundColor: Colors.neutral },
          ]}
        />
      ))}
    </View>
  );
}

export default function TodayScreen() {
  // SCREEN
  const [screenWidth, setScreenWidth] = useState(0);
  const [isToggled, setToggled] = useState(false);

  // TAB (OVERALL): states for rules
  const [selectedChallenge, setSelectedChallenge] = useState("75 Hard");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "75 Hard", value: "75 Hard" },
    { label: "75 Medium", value: "75 Medium" },
    { label: "75 Soft", value: "75 Soft" },
  ]);

  // TAB (OVERALL): states for comment
  const [isEditing, setIsEditing] = useState(false);
  const [originalComment, setOriginalComment] = useState(
    "This is my first time attempting this challenge, and hopefully the last!\n\nInstead of reading 10 pages a day, I will be solving at least 1 leetcode a day."
  );
  const [editedComment, setEditedComment] = useState(originalComment);

  // TODAY: states for diet and water popup
  const [showDietModal, setShowDietModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [inputKcal, setInputKcal] = useState("");
  const [inputProtein, setInputProtein] = useState("");
  const [inputCarbs, setInputCarbs] = useState("");
  const [inputFats, setInputFats] = useState("");
  const [waterAmount, setWaterAmount] = useState("");

  // DUMMY DATA ///////////////////////////////////////////////////////////////

  // probably something like getUser() getUserDailyProgress() getUserTargets() getUserOverallProgress() getUserChallenge()
  const [k, p, c, f] = [500, 15, 60, 90];
  const [kcal, protein, carbohydrate, fat] = [1000, 100, 100, 100];
  const [water, study, workout, photo] = [3000, 1, 1, 0];
  const [progress, total] = [15, 75];
  const challenge = {
    name: "75 Hard",
    rules:
      "You must complete each the following everyday:\n- 45-minute indoor workout.\n- 45-minute outdoor workout.\n- Drink 1 gallon (3.8L) of water.\n- Read 10 pages of a self-improvement book.\n- Take a progress photo.",
  };

  // FUNCTIONS ////////////////////////////////////////////////////////////////

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const handleSaveComment = () => {
    setOriginalComment(editedComment);
    setIsEditing(false);
  };

  const handleCancelComment = () => {
    setEditedComment(originalComment);
    setIsEditing(false);
  };

  const handleEat = () => {
    // In a real app, you’d update k, p, c, f based on input values.
    // For now, simply close the modal.
    setShowDietModal(false);
  };

  const handleDrink = () => {
    // In a real app, update water state here.
    setShowWaterModal(false);
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

  // SCREEN ///////////////////////////////////////////////////////////////////

  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Toggle Container */}
        <View style={[styles.toggleContainer, styles.shadow]}>
          <Pressable
            style={[styles.toggleButton, !isToggled && styles.invertedButton]}
            onPress={handleToggle}
          >
            <Text
              style={[styles.toggleText, !isToggled && styles.invertedText]}
            >
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
              <Streak progress={progress} />
              <Calendar progress={progress} total={total} />
            </View>
            {/* Rules */}
            <View style={styles.overallOtherContainer}>
              <View style={styles.top}>
                <Text style={styles.title}>Rules:</Text>
                <DropDownPicker
                  open={open}
                  value={selectedChallenge}
                  items={items}
                  setOpen={setOpen}
                  setValue={setSelectedChallenge}
                  setItems={setItems}
                  listMode="SCROLLVIEW"
                  containerStyle={[styles.pickerContainer, styles.shadow]}
                  style={styles.picker}
                  dropDownContainerStyle={styles.dropDownContainer}
                />
              </View>
              <View style={[styles.bottom, styles.shadow]}>
                <Text style={styles.text}>{challenge.rules}</Text>
              </View>
            </View>
            {/* Comments */}
            <View style={styles.overallOtherContainer}>
              <View style={styles.top}>
                <Text style={styles.title}>Comments:</Text>
                <View style={styles.iconGroup}>
                  {isEditing ? (
                    <>
                      <Pressable onPress={handleSaveComment}>
                        <Image style={styles.editIcon} source={saveIcon} />
                      </Pressable>
                      <Pressable onPress={handleCancelComment}>
                        <Image style={styles.editIcon} source={cancelIcon} />
                      </Pressable>
                    </>
                  ) : (
                    <Pressable onPress={() => setIsEditing(true)}>
                      <Image style={styles.editIcon} source={editIcon} />
                    </Pressable>
                  )}
                </View>
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
                <Pressable
                  onPress={() => {
                    if (k / kcal < 1) {
                      setShowDietModal(true);
                    }
                  }}
                  disabled={k / kcal >= 1}
                >
                  <View style={[styles.iconContainer, styles.shadow]}>
                    <Image style={styles.icon} source={dietIcon} />
                  </View>
                </Pressable>
              </View>

              <View style={styles.specificProgressContainer}>
                <View style={styles.progressBarContainer}>
                  <Progress.Bar
                    width={screenWidth}
                    height={20}
                    borderRadius={10}
                    progress={water / 3800}
                    color={convertToScaleColor(water / 3800)}
                    unfilledColor="#D9D9D9"
                    borderWidth={0}
                    animated={true}
                  />
                </View>
                <Pressable
                  onPress={() => {
                    if (water / 3800 < 1) {
                      setShowWaterModal(true);
                    }
                  }}
                  disabled={water / 3800 >= 1}
                >
                  <View style={[styles.iconContainer, styles.shadow]}>
                    <Image style={styles.icon} source={waterIcon} />
                  </View>
                </Pressable>
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
                <Pressable
                  onPress={() => {
                    // Increment study by 1 (if not full)
                  }}
                >
                  <View style={[styles.iconContainer, styles.shadow]}>
                    <Image style={styles.icon} source={studyIcon} />
                  </View>
                </Pressable>
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
                <Pressable
                  onPress={() => {
                    // Increment workout by 1 (if not full)
                  }}
                >
                  <View style={[styles.iconContainer, styles.shadow]}>
                    <Image style={styles.icon} source={workoutIcon} />
                  </View>
                </Pressable>
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
                <Pressable
                  onPress={() => {
                    // Increment photo by 1 (if not full)
                  }}
                >
                  <View style={[styles.iconContainer, styles.shadow]}>
                    <Image style={styles.icon} source={photoIcon} />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Render modals outside the ScrollView */}
      <DietModal
        visible={showDietModal}
        onClose={() => setShowDietModal(false)}
        inputKcal={inputKcal}
        setInputKcal={setInputKcal}
        inputProtein={inputProtein}
        setInputProtein={setInputProtein}
        inputCarbs={inputCarbs}
        setInputCarbs={setInputCarbs}
        inputFats={inputFats}
        setInputFats={setInputFats}
        onEat={handleEat}
      />

      <WaterModal
        visible={showWaterModal}
        onClose={() => setShowWaterModal(false)}
        waterAmount={waterAmount}
        setWaterAmount={setWaterAmount}
        onDrink={handleDrink}
      />
    </>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "100%",
    columnGap: 10,
  },
  overallOtherContainer: {
    flexDirection: "column",
    rowGap: 15,
  },
  top: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  pickerContainer: {
    width: 125,
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  picker: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
    backgroundColor: Colors.light,
  },
  dropDownContainer: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  commentInput: {
    height: 100,
    borderWidth: 1,
    borderColor: Colors.neutral,
    borderRadius: 5,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.dark,
  },
  iconGroup: {
    flexDirection: "row",
    columnGap: 5,
  },
  streakContainer: {
    width: 125,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  fireIcon: {
    width: "100%",
    height: "100%",
  },
  streakText: {
    position: "absolute",
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.light,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 222,
    rowGap: 2,
    columnGap: 2,
    borderRadius: 15,
    overflow: "hidden",
  },
  calendarCell: {
    width: 30,
    height: 12,
  },
});
