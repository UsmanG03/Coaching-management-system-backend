import mongoose from "mongoose";

const FeeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // Reference to Student
  coaching: { type: mongoose.Schema.Types.ObjectId, ref: "Coaching", required: true }, // Reference to Coaching Center
  amount: { type: Number,min:500,max:5000 ,required: true },
  remain:{type:String}, // Fee amount for the month
  status: { type: String, enum: ["Paid", "Unpaid", "Partial"], required: true }, // Payment status
  paymentDate: { type: Date, default:Date.now }, // Date of payment
  month:{type:String,required:true},
  // transactionId: { type: String }, // Optional field for tracking payment transactions
  season: { type: mongoose.Schema.Types.ObjectId, ref: "Season" }
});

export default mongoose.model("Fee", FeeSchema);
