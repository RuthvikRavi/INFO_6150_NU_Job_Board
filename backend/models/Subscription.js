import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    userId: {
      type: String
    },
    fullName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    courseName: {
        type: String,
        required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
