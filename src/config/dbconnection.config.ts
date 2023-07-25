import mongoose from "mongoose";

/** Database connection configuration */
export const dbConnection = async () => {
  try {
    const PROD_DB_URL: any = process.env.DB_URL;

    await mongoose.connect(PROD_DB_URL);

    console.log("Database connection established.");
  } catch (error: any) {
    if (error) {
      console.log("Failed to connect database.");
    }
  }
};
