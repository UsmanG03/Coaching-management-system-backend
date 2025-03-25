import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  roll_number:{type:String,required:true},
  name: { type: String, required: true },
  father_name: { type: String, required: true },
  contact: { type: String, required: true },
  father_contact: { type: String, required: true },
  address: { type: String, required: true },
  monthly_fee: { type: String, required: true },
  admission_date: { type: Date, default: Date.now },
  _class: { 
    type: String,
    enum:["1st year","2nd year","10th","9th", "language", "computer"  ], 
    required: true 
  },
  faculty: {
    type: String,
    enum:[
      // for coaching
      "pre eng","pre med","com sci","comm","arts","sci",
      
      // for language
      // "begginer","intermdediat","advance",
      
      // for computer
      // "cit","dit","ms_office","graphic"
      ],
    required: true
  },
  section: { type: String, required: true },
  student_type: { type: String, enum: ["boy", "girl"], required: true },
  coaching: { type: mongoose.Schema.Types.ObjectId, ref: "Coaching", required: true }, // Coaching reference
  season: { type: mongoose.Schema.Types.ObjectId, ref: "Season", required: true }
});

export default mongoose.model("Student", StudentSchema);