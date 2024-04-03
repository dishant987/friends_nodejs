import mongoose, { Schema } from "mongoose";

const friendsmodel = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique:   true
    },
    mobilenum: {
      type: String,
      validate: {
        validator: function (v) {
          // Regular expression to match 10-digit mobile numbers
          return /^\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit mobile number!`,
      },
      required: true, 
      unique: true
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("friendsmaster", friendsmodel);
