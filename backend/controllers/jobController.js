import Job from "../models/Job.js";
import asyncHandler from "express-async-handler";
import { EMPLOYMENT_TYPE, JOB_STATUS } from "../constants/job.js";

// @dec Create new Job
// @route POST/api/jobs
// @access Private (HR Only)
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
// @route Put/api/jobs/:id
// @access Private (Private (HR Only))
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

  // Update fields only if provided
  if (title !== undefined) job.title = title;
  if (description !== undefined) job.description = description;
  if (location !== undefined) job.location = location;
  if (employmentType !== undefined) job.employmentType = employmentType;
  if (experience !== undefined) job.experience = experience;

  // Validate and update status if provided
  if (status !== undefined) {
    if (!Object.values(JOB_STATUS).includes(status)) {
      res.status(400);
      throw new Error("Invalid job status");
    }
    job.status = status;
  }

  const updatedJob = await job.save();

  res.status(200).json({
    success: true,
    data: updatedJob,
    message: "Job updated successfully",
  });
});

// @dec Get all jobs created by logged-in HR
// @route GET /api/jobs/:id
// @access Private (HR Only)
const getAllJobsCreatedByHr = asyncHandler(async (req, res) => {
  const hrId = req.user._id;

  const jobs = await Job.find({ createdBy: hrId })
    .populate({ path: "createdBy", select: "firstName lastName email" })
    .sort({ createdAt: -1 })
    .lean();

  if (jobs.length === 0) {
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  }

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs,
    message: "Jobs fetched successfully",
  });
});

// @dec Delete Job
// @route DELETE/api/jobs
// @access Private (HR Only)
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
    message: "The job posting was removed successfully",
  });
});

// @dec Get All Jobs
// @route GET/api/jobs
// @access Public
const getAllJobs = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find()
    .populate({ path: "createdBy", select: "firstName lastName email" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  if (jobs.length === 0) {
    res.status(404);
    throw new Error("Job not found");
  }

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs,
  });
});

// @dec Get Single Job
// @route GET/api/jobs/:id
// @access Public
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate({ path: "createdBy", select: "firstName lastName email" })
    .lean();

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

// @desc    Get all jobs created by HR that have applications
// @route   GET /api/jobs/with-applications
// @access  Private (HR)

const getJobsWithApplication = asyncHandler(async (req, res) => {
  const hrId = req.user._id;

  const jobs = await Job.aggregate([
    {
      $match: { createdBy: hrId },
    },

    {
      $lookup: {
        from: "applications",
        localField: "_id",
        foreignField: "job",
        as: "applications",
      },
    },

    {
      $addFields: {
        applicationCount: { $size: "$applications" },
      },
    },
    {
      $match: {
        applicationCount: { $gt: 0 },
      },
    },
    {
      $project: { applications: 0, __v: 0 },
    },
    { $sort: { createdAt: -1 } },
  ]);

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs,
    message: "Jobs with applications fetched successfully",
  });
});

export {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getJobById,
  getAllJobsCreatedByHr,
  getJobsWithApplication,
};
