import Job from "../models/Job.js";
import asyncHandler from "express-async-handler";
import { EMPLOYMENT_TYPE, JOB_STATUS } from "../constants/job.js";

// @dec Create new Job
// @route POST/api/jobs
// @access HR Only
const createJob = asyncHandler(async (req, res) => {
  const { title, description, location, employmentType, experience } = req.body;

  const job = await Job.create({
    title,
    description,
    location,
    employmentType: employmentType || EMPLOYMENT_TYPE.FULL_TIME,
    experience,
    createdBy: req.user._id,
    status: JOB_STATUS.OPEN,
  });

  res.status(201).json({
    success: true,
    data: job,
    message: "Job Created Successfully",
  });
});

// @dec update Job
// @route Put/api/jobs
// @access HR Only
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  //  ownership check
  if (job.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You are not allowed to edit this job");
  }

  const { title, description, location, employmentType, experience, status } =
    req.body;

  job.title = title;
  job.description = description;
  job.location = location;
  job.employmentType = employmentType;
  job.experience = experience;

  if (status && !Object.values(JOB_STATUS).includes(status)) {
    res.status(400);
    throw new Error("Invalid job status");
  }
  // status ON / OFF
  if (status) {
    job.status = status;
  }

  const updatedJob = await job.save();

  res.status(200).json({
    success: true,
    data: updatedJob,
    message: "Job updated successfully",
  });
});

// @dec Delete Job
// @route DELETE/api/jobs
// @access Hr Only
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // ownership check
  if (job.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You are not allowed to delete this job");
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});

export { createJob, deleteJob, updateJob };
