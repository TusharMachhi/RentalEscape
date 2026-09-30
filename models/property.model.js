import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 5000,
    },

    propertyType: {
      type: String,
      enum: [
        "apartment",
        "house",
        "villa",
        "cottage",
        "farmhouse",
        "guesthouse",
        "hotel",
        "resort",
        "hostel",
      ],
      required: true,
    },

    roomType: {
      type: String,
      enum: ["entire_place", "private_room", "shared_room"],
      required: true,
    },

    location: {
      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      country: {
        type: String,
        default: "India",
        trim: true,
      },

      postalCode: {
        type: String,
        trim: true,
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },

    guests: {
      maxGuests: {
        type: Number,
        required: true,
        min: 1,
      },

      bedrooms: {
        type: Number,
        required: true,
        min: 0,
      },

      beds: {
        type: Number,
        required: true,
        min: 1,
      },

      bathrooms: {
        type: Number,
        required: true,
        min: 1,
      },

      allowsPets: {
        type: Boolean,
        default: false,
      },
    },

    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    thumbnail: {
      publicId: {
        type: String,
        required: true,
      },

      secureUrl: {
        type: String,
        required: true,
      },
    },

    images: [
      {
        publicId: {
          type: String,
          required: true,
        },

        secureUrl: {
          type: String,
          required: true,
        },
      },
    ],

    pricing: {
      pricePerNight: {
        type: Number,
        required: true,
        min: 0,
      },

      cleaningFee: {
        type: Number,
        default: 0,
        min: 0,
      },

      currency: {
        type: String,
        default: "INR",
        uppercase: true,
      },
    },

    bookingRules: {
      instantBooking: {
        type: Boolean,
        default: false,
      },

      minimumNights: {
        type: Number,
        default: 1,
        min: 1,
      },

      maximumNights: {
        type: Number,
        default: 30,
        min: 1,
      },
    },

    houseRules: [
      {
        type: String,
        trim: true,
      },
    ],

    checkIn: {
      type: String,
      default: "14:00",
    },

    checkOut: {
      type: String,
      default: "11:00",
    },

    cancellationPolicy: {
      type: String,
      enum: ["flexible", "moderate", "strict"],
      default: "moderate",
    },

    status: {
      type: String,
      enum: [
        "draft",
        "pending",
        "approved",
        "rejected",
        "suspended",
        "inactive",
      ],
      default: "draft",
      index: true,
    },

    rejectionReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },

      count: {
        type: Number,
        default: 0,
      },
    },

    viewCount: {
      type: Number,
      default: 0,
    },

    bookingCount: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

propertySchema.index({
  coordinates: "2dsphere",
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
