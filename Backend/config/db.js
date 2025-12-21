import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel_booking`);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
