import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    provider: {
      type: String,
      enum: ["razorpay", "stripe"],
      required: true,
    },

    providerOrderId: {
      type: String,
      trim: true,
      index: true,
    },

    providerPaymentId: {
      type: String,
      trim: true,
      index: true,
    },

    providerSignature: {
      type: String,
      trim: true,
      select: false,
    },

    status: {
      type: String,
      enum: [
        "created",
        "pending",
        "paid",
        "failed",
        "refunded",
        "partially_refunded",
      ],
      default: "created",
      index: true,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    refundedAt: {
      type: Date,
      default: null,
    },

    failureReason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

paymentSchema.index({
  booking: 1,
  createdAt: -1,
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
