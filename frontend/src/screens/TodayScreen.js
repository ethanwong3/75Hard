// TODO: color interpolation function in theme.js and used for pie bar
// TODO: apply conditional application of today and overall pages
// TODO: retrieve user data

import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import PieChart from "react-native-pie-chart";
import * as Progress from "react-native-progress";

import { Colors, Fonts } from "../styles/theme";
import dietIcon from "../assets/dietIcon.png";
import waterIcon from "../assets/waterIcon.png";
import studyIcon from "../assets/studyIcon.png";
import workoutIcon from "../assets/workoutIcon.png";
import photoIcon from "../assets/photoIcon.png";

export default function TodayScreen() {
  const [screenWidth, setScreenWidth] = useState(0);

  // add conditional logic that swaps screens and dynamically aplpies inversion
  const [isToggled, setToggled] = useState(false);
  const handleToggle = () => {
    setToggled(!isToggled);
  };

  // user data
  const [k, p, c, f] = [500, 15, 60, 90]; // getUserMacroProgress();
  const [kcal, protein, carbohydrate, fat] = [1000, 100, 100, 100]; // getUserMacroGoals();
  const [water, study, workout, photo] = [3, 1, 1, 0]; // getUserOtherProgress();
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

  return (
    <View style={styles.container}>
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
        {/* For each progress bar, the container measures its width */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
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
    width: "100%",
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
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: 20,
  },
  specificProgressContainer: {
    width: "100%",
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
});
