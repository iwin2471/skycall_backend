import express from 'express';
import logger from 'morgan';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import moment from 'moment-timezone';
import cookieSession from 'cookie-session';
import to from 'await-to-js';

let debug = require('debug')('dicon:server');

//external module setting
let now_time = moment().tz("Asia/Seoul");


const app = express();

//module setting
import { Users } from './mongo';
const passport = require("./passport")(Users);


//function
require('./func');

//set engin
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  keys: ['h0t$ix'],
  cookie: {
    maxAge: 1000 * 60 * 60 // 유효기간 1시간
  }
}))
app.use(passport.initialize());
app.use(passport.session());

//router setting
import index from "./routes/index";
import auth from "./routes/auth";

//router use
app.use("/", index(express.Router()));
app.use("/auth", auth(express.Router(), passport, Users, to));

module.exports = app;
