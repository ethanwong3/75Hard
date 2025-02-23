import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

export const challengeFetch = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found!" });
    }

    const challenge = await Challenge.findById(user.challenge);
    if (!challenge) {
      return res
        .status(400)
        .json({ success: false, error: "No challenge selected!" });
    }

    res.status(200).json({ success: true, data: challenge });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: e.message });
  }
};
