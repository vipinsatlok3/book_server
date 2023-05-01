import { connect } from "mongoose";
import { MONGO_URI } from "./envVariables";

export default async function connectDB() {
  try {
    await connect(MONGO_URI as string);
    console.log("connected to mongodb database");
  } catch (err: any) {
    console.log("db error ", err.message);
  }
}
