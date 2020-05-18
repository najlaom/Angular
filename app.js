const apiroutes = require('./routes/api_routes');
const adminroutes = require('./routes/api_routes');
const itemRouter = require('./controller/item_controller');
const accessoryRouter = require('./controller/accessory_controller')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
require('./config/passport');



const app = express();

const config= { "jwtSecret": "secret" }

//middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cors());

//using routes specified externally
app.use('/', apiroutes);
app.use('/admin', adminroutes);
app.use('/item', itemRouter);
app.use('/accessory',accessoryRouter);
app.get('/unity', (req, res) => {
  res.send('Hello Unity Developers!');
});
let enemy = {
  "name": "orc",
  "health": 100,
  "attack": 25
}
app.get('/enemy/orc', (req, res) => {
  res.send(enemy);
});
app.use('/public', express.static('public'));
mongoose.set('useFindAndModify', false);

//Passport 
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
//mongoDB connection string
const url = 'mongodb://localhost:27017/mydb';
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    app.listen(3000);
    console.log('database connected!');})
  .catch(err => console.log(err));
