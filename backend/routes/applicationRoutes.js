import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  applyForJob,
  getApplicationForJob,
  updateCandidateStatus,
  getCandidateApplications,
} from "../controllers/applicationControllers.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// =================== Candidate Routes ===================

// Apply for a job
router.post("/:jobId", protect, authorize(ROLES.CANDIDATE), applyForJob);

// Get logged-in candidate’s applications
router.get(
  "/my-applications",
  protect,
  authorize(ROLES.CANDIDATE),
  getCandidateApplications,
);

// =================== HR Routes ===================

// Get all applications for a specific job
router.get("/job/:jobId", protect, authorize(ROLES.HR), getApplicationForJob);

// Update candidate application status (shortlisted, rejected, etc.)
router.patch(
  "/:id/status",
  protect,
  authorize(ROLES.HR),
  updateCandidateStatus,
);

export default router;
