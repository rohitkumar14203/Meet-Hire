import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Provide First Name"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Please Provide Last Name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please Provide a Email"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Please Provide Password"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      required: [true, "Role is required"],
    },

    profileImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

//Hash Password

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// Compare Password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
