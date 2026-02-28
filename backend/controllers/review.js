import Review from "../models/review.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const name = JSON.parse(req.body.name);
    const text = JSON.parse(req.body.text);
    const stars = req.body.stars;

    if(!name.en && !name.hi) return res.status(400).json({ message: "Either English or Hindi name is required" });
    if(!text.en && !text.hi) return res.status(400).json({ message: "Either English or Hindi text is required" });
    if (stars === undefined) return res.status(400).json({ message: "Stars are required" });
    if (stars < 1 || stars > 5) return res.status(400).json({ message: "Stars must be between 1 and 5" });

    const newReview = await Review.create({ name, text, stars });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review approved successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const rejectReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review rejected successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}