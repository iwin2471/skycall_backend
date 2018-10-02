import mongoose from 'mongoose';
import rndString from "randomstring";

var name = require('../package.json');
//mongodb will connect to localhost/projectname

var db = mongoose.connect('mongodb://localhost/'+name.name);
mongoose.Promise = global.Promise;

var UsersSchema = mongoose.Schema({
  id: {type: String},
  passwd: {type: String},
  name: {type: String},
  token: {type: String},
  setting: {type: String},
  profile: {type: String},
  profile_img: {type: String}, // url을 넣으주면됨
  facebook_id: {type: String},
  github_id: {type: String},
  twitter_id: {type: String},
  is_admin: {type: Boolean, default: false}//어드민 체크 할때 0: 일반 1: 어드민
});

var BoardsSchema = mongoose.Schema({
  board_id: {type: String},
  writer: {type: String},
  title: {type: String},
  contents: {type: String},
  comment:[{
    id: {type: Number},
    writer: {type: String},
    summary: {type: String}
  }]
});

require('./err')(UsersSchema, BoardsSchema, rndString);

var Users = mongoose.model("users", UsersSchema);
var Boards = mongoose.model("boards", BoardsSchema);

exports.Users = Users;
exports.Boards = Boards;

export default db;
