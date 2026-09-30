import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
      index: true,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      adults: {
        type: Number,
        required: true,
        min: 1,
      },

      children: {
        type: Number,
        default: 0,
        min: 0,
      },

      infants: {
        type: Number,
        default: 0,
        min: 0,
      },

      pets: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    pricing: {
      pricePerNight: {
        type: Number,
        required: true,
      },

      nights: {
        type: Number,
        required: true,
      },

      subtotal: {
        type: Number,
        required: true,
      },

      cleaningFee: {
        type: Number,
        default: 0,
      },

      serviceFee: {
        type: Number,
        default: 0,
      },

      discount: {
        type: Number,
        default: 0,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      currency: {
        type: String,
        default: "INR",
      },
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "rejected"],
      default: "pending",
      index: true,
    },

    cancellationReason: {
      type: String,
      trim: true,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

bookingSchema.index({
  property: 1,
  checkIn: 1,
  checkOut: 1,
});

bookingSchema.index({
  guest: 1,
  createdAt: -1,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
