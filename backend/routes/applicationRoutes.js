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

// ================= HR routes =================

// HR: get all applications for a job
router.get("/job/:jobId", protect, authorize(ROLES.HR), getApplicationForJob);

// HR: update candidate application status
router.patch(
  "/:id/status",
  protect,
  authorize(ROLES.HR),
  updateCandidateStatus
);

// ================= Candidate routes =================

// Candidate: apply for a job
router.post("/:jobId", protect, authorize(ROLES.CANDIDATE), applyForJob);

export default router;
