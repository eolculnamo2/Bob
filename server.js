const express = require('express');
const app = express();

app.use(express.static('assets/dist'));

app.get('/', (req,res) => res.sendFile(__dirname+'/example/index.html'));

app.listen(8080, () => console.log("BobJS Test Server listening on Port 8080"))