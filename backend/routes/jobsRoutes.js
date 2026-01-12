import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import { body } from "express-validator";
import { ROLES } from "../constants/roles.js";
import { EMPLOYMENT_TYPE, JOB_STATUS } from "../constants/job.js";
import {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
} from "../controllers/jobController.js";
import validate from "../middleware/validate.js";

const router = express.Router();

const createJobValidation = [
  body("title")
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ min: 3 })
    .withMessage("Job title must be at least 3 characters"),

  body("description")
    .notEmpty()
    .withMessage("Job description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("location").notEmpty().withMessage("Location is required"),

  body("employmentType")
    .optional()
    .isIn(Object.values(EMPLOYMENT_TYPE))
    .withMessage("Invalid employment type"),

  body("experience")
    .optional()
    .isString()
    .withMessage("Experience must be a string"),

  body("status")
    .optional()
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid job status"),
];

const updateJobValidation = [
  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Job title must be at least 3 characters"),

  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("location")
    .optional()
    .notEmpty()
    .withMessage("Location cannot be empty"),

  body("employmentType")
    .optional()
    .isIn(Object.values(EMPLOYMENT_TYPE))
    .withMessage("Invalid employment type"),

  body("experience")
    .optional()
    .isString()
    .withMessage("Experience must be a string"),

  body("status")
    .optional()
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid job status"),
];

router.post(
  "/",
  protect,
  authorize(ROLES.HR),
  createJobValidation,
  validate,
  createJob
);

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.put(
  "/:id",
  protect,
  authorize(ROLES.HR),
  updateJobValidation,
  validate,
  updateJob
);

router.delete("/:id", protect, authorize(ROLES.HR), deleteJob);

export default router;
