'use strict';
const express = require('express');
const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;

const PORT = 3080;
const HOST = '0.0.0.0';
const MONGO_USERNAME = 'eloi';
const MONGO_PASSWORD = 'unsafe_password';
const MONGO_HOSTNAME = 'db';
const MONGO_PORT = '27017';
const MONGO_DB = 'stationf-test';
const dbURL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const app = express();

// This is my first time using MongoDB, I recognize that I do not use the most optimal solutions
async function initCollections(db) {
  // Create Scheduling Collection
  const schedCollection = await db.listCollections({name: "schedule"}).toArray()
  if (!schedCollection[0]) db.createCollection("schedule");

  const roomsCollection = await db.listCollections({name: "rooms"}).toArray()
  // If the collection exists, there's nothing left to be done here
  if (roomsCollection[0]) return ;
  // Create and populate the rooms collection, with the data provided to us
  const rooms = await db.createCollection("rooms");
  const fetchRooms = await fetch("https://online.stationf.co/tests/rooms.json");
  const roomData = await fetchRooms.json();
  for (const el of roomData["rooms"]) {
    rooms.insertOne({name: el.name, description: el.description, capacity: el.capacity, equipements: el.equipements});
  }
}

MongoClient.connect(dbURL, { useUnifiedTopology: true }).then(async connection => {
  const db = connection.db("stationf-test");
  await initCollections(db).catch(error => console.log(error));

  app.get('/get-rooms', (req, res) => {
    db.collection("rooms").find({}).toArray()
        .then(result => res.json(result))
        .catch(err => console.error(err));
  });
  app.get("/get-available-rooms", (req, res) => {
    res.send("Hello Brother");
  });

  app.post('set-appointment', (req, res) => {
    // const body = req.body;
    console.log(req.body);
    const body = {appointmentStart:1, appointmentEnd:5, roomName:"Sale #1", user:"Eloi"}
    const schedule = db.collections("schedule");
    schedule.insertOne(body);
    res.sendStatus(200);
  });

}).catch(err => console.log(err));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
