// TODO => Backend => separate some of the user backend functions so that we are not always fetching entire user
// TODO => Frontend => no challenge screen + switch challenge screen + loading screen
// TODO => Other => State Management (redux)

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

import LoadingScreen from "../components/LoadingScreen";
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

import { userFetch, userUpdate } from "../api";

// extra components

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
  // STATES ///////////////////////////////////////////////////////////////////

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = 0;
  const [screenWidth, setScreenWidth] = useState(0);
  const [isToggled, setToggled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [showDietModal, setShowDietModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [inputKcal, setInputKcal] = useState("");
  const [inputProtein, setInputProtein] = useState("");
  const [inputCarbs, setInputCarbs] = useState("");
  const [inputFats, setInputFats] = useState("");
  const [waterAmount, setWaterAmount] = useState("");

  // HOOK /////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      console.log("Fetching user data...");
      const res = await userFetch(userId);
      console.log("User data response:", res);

      if (res.success) {
        setUserData(res.data);
        setEditedComment(userData.challengeComment || "");
      } else {
        console.error(res.error);
      }

      setLoading(false);
    };

    fetchUser();
  }, [userData]);

  // DATA /////////////////////////////////////////////////////////////////////

  // user progress data
  const kcal = userData?.nutritionProgress.calories || 0;
  const protein = userData?.nutritionProgress.protein || 0;
  const carbohydrate = userData?.nutritionProgress.carbohydrates || 0;
  const fat = userData?.nutritionProgress.fats || 0;
  const water = userData?.otherProgress.water || 0;
  const study = userData?.otherProgress.study || 0;
  const workout = userData?.otherProgress.workout || 0;
  const photo = userData?.otherProgress.photo || 0;

  // user goal data
  const k = userData?.nutritionGoals.calories || 0;
  const p = userData?.nutritionGoals.protein || 0;
  const c = userData?.nutritionGoals.carbohydrates || 0;
  const f = userData?.nutritionGoals.fats || 0;
  const wa = userData?.challenge?.goals.water || 0;
  const st = userData?.challenge?.goals.study || 0;
  const wo = userData?.challenge?.goals.workout || 0;
  const ph = userData?.challenge?.goals.photo || 0;

  if (loading) return <LoadingScreen />;

  // FUNCTIONS ////////////////////////////////////////////////////////////////

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const handleSaveComment = async () => {
    setIsEditing(false);
    if (editedComment === userData?.challengeComment) {
      console.log("No changes detected, skipping API call.");
      return;
    }

    console.log("Updating user comment...");
    const res = await userUpdate(userId, { challengeComment: editedComment });

    if (res.success) {
      console.log("Comment updated successfully:", res.data.challengeComment);
      setUserData((prevData) => ({
        ...prevData,
        challengeComment: res.data.challengeComment,
      }));
    } else {
      console.error("Failed to update comment:", res.error);
    }
  };

  const handleCancelComment = () => {
    setIsEditing(false);
    setEditedComment(userData?.challengeComment);
  };

  const handleEat = async () => {
    const updatedData = {
      nutritionProgress: {
        calories: userData?.nutritionProgress.calories + parseInt(inputKcal),
        protein: userData?.nutritionProgress.protein + parseInt(inputProtein),
        carbohydrates:
          userData?.nutritionProgress.carbohydrates + parseInt(inputCarbs),
        fats: userData?.nutritionProgress.fats + parseInt(inputFats),
      },
    };

    console.log("Updating nutrition progress...", updatedData);

    const res = await userUpdate(userId, updatedData);

    if (res.success) {
      console.log("Nutrition progress updated:", res.data.nutritionProgress);

      setUserData((prevData) => ({
        ...prevData,
        nutritionProgress: res.data.nutritionProgress,
      }));
    } else {
      console.error("Failed to update nutrition progress:", res.error);
    }

    setShowDietModal(false);
  };

  const handleDrink = async () => {
    const updatedData = {
      otherProgress: {
        ...userData.otherProgress,
        water: userData?.otherProgress.water + parseInt(waterAmount),
      },
    };

    console.log("Updating water intake...", updatedData);

    const res = await userUpdate(userId, updatedData);

    if (res.success) {
      console.log("Water intake updated successfully:", res.data.otherProgress);

      setUserData((prevData) => ({
        ...prevData,
        otherProgress: res.data.otherProgress,
      }));
    } else {
      console.error("Failed to update water intake:", res.error);
    }

    setShowWaterModal(false);
  };

  const handleOtherProgress = async (progressType) => {
    const updatedData = {
      otherProgress: {
        ...userData.otherProgress,
        [progressType]: userData?.otherProgress[progressType] + 1,
      },
    };

    console.log(`Updating ${progressType} progress...`, updatedData);

    const res = await userUpdate(userId, updatedData);

    if (res.success) {
      console.log(
        `${progressType} updated successfully:`,
        res.data.otherProgress
      );

      setUserData((prevData) => ({
        ...prevData,
        otherProgress: res.data.otherProgress,
      }));
    } else {
      console.error(`Failed to update ${progressType}:`, res.error);
    }
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
              <Streak progress={userData?.overallProgress} />
              <Calendar
                progress={userData?.overallProgress}
                total={userData?.challenge?.total}
              />
            </View>
            {/* Rules */}
            <View style={styles.overallOtherContainer}>
              <View style={styles.top}>
                <Text style={styles.title}>Rules:</Text>
                <Text style={[styles.text, styles.picker]}>
                  {challenge.name}
                </Text>
              </View>
              <View style={[styles.pickerContainer, styles.shadow]}>
                <Text style={[styles.text, styles.picker]}>
                  {userData?.challenge?.name || "No Challenge"}
                </Text>
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
                  <Text style={styles.text}>{userData?.challengeComment}</Text>
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
                <Pressable onPress={() => setShowDietModal(true)}>
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
                    progress={water / wa}
                    color={convertToScaleColor(water / wa)}
                    unfilledColor="#D9D9D9"
                    borderWidth={0}
                    animated={true}
                  />
                </View>
                <Pressable onPress={() => setShowWaterModal(true)}>
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
                    progress={study / st}
                    color={convertToScaleColor(study / st)}
                    unfilledColor="#D9D9D9"
                    borderWidth={0}
                    animated={true}
                  />
                </View>
                <Pressable
                  onPress={() => {
                    handleOtherProgress("study");
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
                    progress={workout / wo}
                    color={convertToScaleColor(workout / wo)}
                    unfilledColor="#D9D9D9"
                    borderWidth={0}
                    animated={true}
                  />
                </View>
                <Pressable
                  onPress={() => {
                    handleOtherProgress("workout");
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
                    progress={photo / ph}
                    color={convertToScaleColor(photo / ph)}
                    unfilledColor="#D9D9D9"
                    borderWidth={0}
                    animated={true}
                  />
                </View>
                <Pressable
                  onPress={() => {
                    handleOtherProgress("photo");
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
