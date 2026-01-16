import asyncHandler from "express-async-handler";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { APPLICATION_STATUS } from "../constants/application.js";

// @desc    Apply for a job
// @route   POST /api/applications/:jobId
// @access  Private (Candidate)
const applyForJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const candidateId = req.user._id;

  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  const application = await Application.create({
    job: jobId,
    candidate: candidateId,
  });

  res.status(201).json({
    success: true,
    data: application,
    message: "Application submitted successfully",
  });
});

// @desc    Get Application for job (Per Job -> applications)
// @route   GET /api/applications/job/:jobId
// @access  Private (HR)
const getApplicationForJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const hrId = req.user._id;

  const job = await Job.findOne({ _id: jobId, createdBy: hrId });

  if (!job) {
    res.status(403);
    throw new Error("You are not authorized to view applications for this job");
  }

  const applications = await Application.find({ job: jobId })
    .populate({
      path: "candidate",
      select: "firstName lastName email",
    })
    .populate({
      path: "job",
      select: "title location description employmentType experience",
    })
    .sort({ createdAt: -1 })
    .lean();

  if (applications.length === 0) {
    res.status(404);
    throw new Error("Application not found");
  }

  if (job.length === 0) {
    res.status(404);
    throw new Error("Application not found");
  }

  res.status(200).json({
    success: true,
    count: applications.length,
    data: applications,
    message: "Applications fetched successfully",
  });
});

const updateCandidateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params; // application id
  const { status } = req.body;
  const hrId = req.user._id;

  const application = await Application.findById(id).populate("job");

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  if (application.job.createdBy.toString() !== hrId.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this application");
  }

  application.status = status;
  await application.save();

  res.status(200).json({
    success: true,
    data: application,
    message: "Candidate status updated successfully",
  });
});

<<<<<<< HEAD
// @desc    Get all applications for logged-in candidate
// @route   GET /api/applications/my-applications
// @access  Private (Candidate)
const getCandidateApplications = asyncHandler(async (req, res) => {
  const candidateId = req.user._id;

  const applications = await Application.find({ candidate: candidateId })
    .populate({
      path: "job",
      select: "title location description employmentType experience createdBy status",
      populate: {
        path: "createdBy",
        select: "firstName lastName email",
      },
    })
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    count: applications.length,
    data: applications,
    message: "Applications fetched successfully",
  });
});

export { 
  applyForJob, 
  getApplicationForJob, 
  updateCandidateStatus,
  getCandidateApplications 
};
=======


export { applyForJob, getApplicationForJob, updateCandidateStatus };
>>>>>>> 3a9c92a14a065d795c4e6dab3eef798f61400da6
