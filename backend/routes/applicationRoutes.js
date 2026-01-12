import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  applyForJob,
  getApplicationForJob,
  updateCandidateStatus,
} from "../controllers/applicationControllers.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.post("/:jobId", protect, authorize(ROLES.CANDIDATE), applyForJob);
router.get("/job/:jobId", protect, authorize(ROLES.HR), getApplicationForJob);
router.patch(
  "/:id/status",
  protect,
  authorize(ROLES.HR),
  updateCandidateStatus
);

export default router;
