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

router.post("/:jobId", protect, authorize(ROLES.CANDIDATE), applyForJob);
router.get(
  "/my-applications",
  protect,
  authorize(ROLES.CANDIDATE),
  getCandidateApplications
);
router.get("/job/:jobId", protect, authorize(ROLES.HR), getApplicationForJob);
router.patch(
  "/:id/status",
  protect,
  authorize(ROLES.HR),
  updateCandidateStatus
);

export default router;
