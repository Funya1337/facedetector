const express = require('express');
const path = require('path');
const app = express();

app.use('/static', express.static('../build/static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/', 'index.html'));
})

app.listen(3001, () => {
	console.log('Backend working on port 3001');
});