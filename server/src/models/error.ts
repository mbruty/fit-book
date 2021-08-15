import { Schema, model } from "mongoose";
import { IResponseLogObj } from "../responseLogger";

const errorSchema = new Schema({
  message: { type: String, required: true},
  verbose: { type: String, required: true},
  path: { type: String, required: true},
  date: { type: Date, required: true, default: new Date()},
});

export default model<IResponseLogObj>("Errors", errorSchema);
