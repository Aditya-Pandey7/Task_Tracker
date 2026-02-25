import mongoose from "mongoose";

export const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "No description provided",
    },
    status: {
      type: String,
      enum: ["not started", "on track", "off track"],
      default: "not started",
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    time: {
      type: Date,
      default: Date.now,
    },
    repeat: {
      type: String,
      enum: ["never", "daily", "weekly", "monday to friday", "monthly"],
      default: "never",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = mongoose.model("Task", taskSchema);
