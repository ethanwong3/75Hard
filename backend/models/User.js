import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic user fields
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    // Personal information with validation
    age: {
      type: Number,
      required: true,
      min: 10,
      max: 120,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    height: {
      type: Number,
      required: true,
      min: 50,
      max: 250,
    },
    weight: {
      type: Number,
      required: true,
      min: 20,
      max: 500,
    },
    activityLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    // Nutrition progress
    nutritionProgress: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbohydrates: { type: Number, default: 0 },
      fats: { type: Number, default: 0 },
    },
    // Other Progress
    otherProgress: {
      water: { type: Number, default: 0 },
      study: { type: Number, default: 0 },
      workout: { type: Number, default: 0 },
      photo: { type: Number, default: 0 },
    },
    // Nutrition goals
    nutritionGoals: {
      calories: { type: Number },
      protein: { type: Number },
      carbohydrates: { type: Number },
      fats: { type: Number },
    },
    customGoals: {
      type: Boolean,
      default: false,
    },
    // Challenge data
    overallProgress: {
      type: Number,
      default: 0,
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
    },
    challengeComment: {
      type: String,
      trim: true,
    },
    // Social
    posts: [
      {
        date: { type: Date, default: Date.now },
        description: { type: String, trim: true },
        rating: { type: Number, required: true },
        image: { type: String },
        success: { type: Boolean, required: true },
        posted: { type: Boolean, default: false },
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!this.customGoals) {
    // Mifflin-St Jeor equation:
    let bmr;
    if (user.gender === "male") {
      bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
    } else {
      bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
    }
    // Map activity level (1-5) to an activity factor:
    const activityFactors = {
      1: 1.2,
      2: 1.375,
      3: 1.55,
      4: 1.725,
      5: 1.9,
    };
    const activityFactor = activityFactors[user.activityLevel] || 1.2;
    const tdee = Math.round(bmr * activityFactor);

    // Set default nutritional goals based on TDEE:
    // Calories goal = TDEE
    user.nutritionGoals.calories = tdee;

    // Protein goal = 2 grams per kilogram of body weight
    user.nutritionGoals.protein = Math.round(user.weight * 2);

    // Fat goal = 25% of TDEE divided by 9 (since 1g fat = 9 calories)
    user.nutritionGoals.fats = Math.round((tdee * 0.25) / 9);

    // Carbohydrates goal = remaining calories divided by 4 (since 1g carb = 4 calories)
    const caloriesForProtein = user.nutritionGoals.protein * 4;
    const caloriesForFat = user.nutritionGoals.fats * 9;
    const remainingCalories = tdee - (caloriesForProtein + caloriesForFat);
    user.nutritionGoals.carbohydrates = Math.round(remainingCalories / 4);
  }

  next();
});

// export the model
export default mongoose.model("User", userSchema);
