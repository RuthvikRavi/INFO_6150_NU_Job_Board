import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    companySize: {
      type: String,
      required: true,
    },
    applications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Application",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
