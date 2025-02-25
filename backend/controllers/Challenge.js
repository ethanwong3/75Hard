import Challenge from "../models/Challenge.js";

export const challengeFetch = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[DEBUG] Fetching challenge with ID: ${id}`);
    const challenge = await Challenge.findById(id);

    if (!challenge) {
      console.warn(`[WARN] Challenge not found: ${id}`);
      return res
        .status(404)
        .json({ success: false, error: "Challenge not found!" });
    }

    console.log(`[DEBUG] Challenge retrieved successfully: ${challenge.name}`);
    res.status(200).json({ success: true, data: challenge });
  } catch (e) {
    console.error(
      `[ERROR] Failed to fetch challenge ID: ${req.params.id} - ${e.message}`
    );
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};
