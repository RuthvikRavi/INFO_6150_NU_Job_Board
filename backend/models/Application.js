import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
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
    phone: {
      type: Number,
      required: true
    },
    jobName: {
        type: String,
        required: true
    },
    expectedSalary: {
      type: Number,
      required: true
    },
    dateOfAvailability: {
        type: Date,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
