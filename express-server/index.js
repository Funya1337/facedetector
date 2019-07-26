import express from 'express';
import path from 'path';
import VK from 'vk-io';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import Bluebird from 'Bluebird';

fetch.Promise = Bluebird;

const app = express();
const db = require('../config/keys').mongoURI;
require('dotenv').config();
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.log(err);
    console.log('MongoDB Not Connected');
  });

// app.use('/static', express.static('../build/static'));

const vk = new VK({
    token: process.env.TOKEN
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/', 'index.html'));
// })

app.get('/getusers', (req, res) => {
   fetch('localhost:8080')
   .then(res => res.json())
   .then(data => {
    res.send({ data });
  })
   .catch(err => {
    res.redirect('/error');
  });
})

app.get('/vkusers', (req, res) => {
  async function run() {
    const response = await vk.api.groups.getMembers({
        group_id: 'lanatsummerschool'
    });
 
    res.json([
      Object.values(response)[1]
    ])
}
 
run().catch(console.log);
})

app.listen(3001, () => {
	console.log('Backend working on port 3001');
});
