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

<<<<<<< HEAD
router.post("/:jobId", protect, authorize(ROLES.CANDIDATE), applyForJob);
router.get("/my-applications", protect, authorize(ROLES.CANDIDATE), getCandidateApplications);
=======
// ================= HR routes =================

// HR: get all applications for a job
>>>>>>> 3a9c92a14a065d795c4e6dab3eef798f61400da6
router.get("/job/:jobId", protect, authorize(ROLES.HR), getApplicationForJob);
router.patch(
  "/:id/status",
  protect,
  authorize(ROLES.HR),
  updateCandidateStatus
);

export default router;
