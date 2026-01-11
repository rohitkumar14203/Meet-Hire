import mongoose from "mongoose";
import { EMPLOYMENT_TYPE, JOB_STATUS } from "../constants/job.js";

const jobSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
    },

    location: {
      type: String,
      required: true,
    },

    employmentType: {
      type: String,
      enum: Object.values(EMPLOYMENT_TYPE),
      default: EMPLOYMENT_TYPE.FULL_TIME,
    },

    experience: {
      type: String,
    },

    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.OPEN,
    },
  },

  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
