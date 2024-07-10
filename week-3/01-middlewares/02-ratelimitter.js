const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

app.use(express.json())

let numberOfRequestsForUser = {};

setInterval(() => {
    numberOfRequestsForUser = {};
}, 5000)

//global rate limiter/
// let timeOut = null;
// app.use((req,res,next)=> {
//   timeOut ? clearTimeout(timeOut) : null;
//   timeOut = setTimeout(()=> {
//     console.log("request sent.")
//     next();
//   },1000)
// })

// user specific rate limiter.

app.use((req,res,next)=> {
  console.log(req.headers.user_id,numberOfRequestsForUser[req.headers.user_id] );
  if(numberOfRequestsForUser[req.headers.user_id] > 5) {
    console.log("Inside greater than 5");
    return res.status(404).json({message : "request exceeds the limit. " + numberOfRequestsForUser[req.headers.user_id]});
  }
  else {
    console.log("inside elese not greater than 5")
    if(numberOfRequestsForUser[req.headers.user_id]) {
      numberOfRequestsForUser[req.headers.user_id] = numberOfRequestsForUser[req.headers.user_id]+1;
    } else {
      numberOfRequestsForUser[req.headers.user_id] = 1;
    }
    console.log(numberOfRequestsForUser);
    next()
  }
})

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.listen(3000, ()=> {
  console.log("App listening on port 3000");
})

module.exports = app;