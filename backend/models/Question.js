import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctOption: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy"
    },
    topic: { type: String, required: true },
    marks: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
