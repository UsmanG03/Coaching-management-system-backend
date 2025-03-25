import mongoose from "mongoose";

const CoachingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerName: { type: String, required: true, trim: true }, // Owner's name
  contact: { type: String, required: true, trim: true }, // Contact phone number
  address: { type: String, required: true }, // Coaching center address
  email: { type: String, required: true, unique: true },
  // registrationYear: { type: String, required: true }, // Unique coaching registration number
  password: { type: String, required: true },
  isAdmin:{type:Boolean,required:true},
  createdAt: { type: Date, default: Date.now },
},
{timestamps:true});

export default mongoose.model("Coaching", CoachingSchema);



// import mongoose from "mongoose";

// const coachingSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true }, // Coaching center name
//     email: { type: String, required: true, unique: true, trim: true }, // Contact email
//     phone: { type: String, required: true, trim: true }, // Contact phone number
//     address: { type: String, required: true }, // Coaching center address
//     ownerName: { type: String, required: true, trim: true }, // Owner's name
//     academicSeason: { type: String, required: true }, // Example: "2024-2025"
//     createdAt: { type: Date, default: Date.now }, // Timestamp for creation
//   },
//   { timestamps: true }
// );

// const Coaching = mongoose.model("Coaching", coachingSchema);

// export default Coaching;

