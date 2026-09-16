import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const addressSchema = new mongoose.Schema(
  {
    addressLine1: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    addressLine2: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    city: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    state: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    country: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "India",
    },

    postalCode: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: undefined,
      },
    },
  },
  {
    _id: false,
  },
);

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    profile: {
      type: String,
      default: null,
    },

    address: {
      type: [addressSchema],
      default: [],
    },

    role: {
      type: String,
      enum: ["user", "host", "admin"],
      default: "user",
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (payload) {
  return jwt.sign(payload, process.env.ACCESSTOKEN_SECRET, {
    expiresIn: process.env.ACCESSTOKEN_EXPIRES,
  });
};

userSchema.methods.generateRefreshToken = function (payload) {
  return jwt.sign(payload, process.env.REFRESHTOKEN_SECRET, {
    expiresIn: process.env.REFRESHTOKEN_EXPIRES,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
