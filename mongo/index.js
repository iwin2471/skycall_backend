import mongoose from 'mongoose';
import rndString from "randomstring";

import { name } from '../package.json';

let db = mongoose.connect(
  "mongodb://localhost/" + name, { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

let UsersSchema = mongoose.Schema({
  id: { type: String, unique: true },
  passwd: { type: String },
  name: { type: String },
  token: { type: String },
  sub_name: { type: String },
  business_name: { type: String },
  business_area: { type: String },
  business_start_day: { type: Date },
  business_reg_number: { type: String },
  phone_number: { type: String },
  accept_height: { type: Number },


  profile_img: { type: String },
  facebook_id: { type: String },
  twitter_id: { type: String },
  type: { type: Boolean, default: false } //발주자 true 수주자 false
});

const BoardsSchema = mongoose.Schema({
  board_id: { type: String },
  area: { type: String },
  writer: { type: String },
  title: { type: String },
  max_worker: { type: Number },
  duration: { type: String },
  comment: [{
    name: { type: Number },
    summary: { type: String },
    working_area: { type: String },
    exprience_day: { type: Number },
  }]
});

require('./err')(UsersSchema, BoardsSchema, rndString);

const Users = mongoose.model("users", UsersSchema);
const Boards = mongoose.model("boards", BoardsSchema);

exports.Users = Users;
exports.Boards = Boards;

export default db;