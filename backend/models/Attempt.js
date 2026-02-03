import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      // later this can be Google ID, Mongo user _id
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    subject: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    answers: {
      type: Map,
      of: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attempt", attemptSchema);
