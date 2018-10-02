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
let debug = require('debug')('dicon:server');

//external module setting
let now_time = moment().tz("Asia/Seoul");


let app = express();

//module setting
import {Users} from './mongo';
let passport = require('./passport')(Users);

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
var router = require('./routes/index')(express, Users, passport, now_time);

//router setting
app.use('/', router);

module.exports = app;
