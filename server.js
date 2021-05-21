require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');
const axios = require('axios');
const router = express.Router();
const fetch = require('node-fetch')
const SECRET_SESSION = process.env.SECRET_SESSION;

// (async () => {
//   const response = await fetch(
//     'https://parseapi.back4app.com/classes/Carmodels_Car_Model_List_Ford?limit=10&keys=Make,Model',
//     {
//       headers: {
//         'X-Parse-Application-Id': process.env.X_PARSE_APPLICATION_ID, // This is your app's application id
//         'X-Parse-REST-API-Key': process.env.X_PARSE_REST_API_KEY, // This is your app's REST API key
//       }
//     }
//   );
//   const data = await response.json(); // Here you have the data that you need
//   console.log(JSON.stringify(data, null, 2));
// })();


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log('========= RES.LOCALS =================')
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.use('/auth', require('./controllers/auth'));
app.use('/cars', require('./controllers/cars'));

// start
app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

// app.get('/currentgarage', isLoggedIn, (req, res) => {
//   const { id, name} = req.user.get();
//   res.render('currentgarage', { id, name });
// })

// app.get('/currentgarage', isLoggedIn, (req, res) => {
//   const { make, model, description} = db.car.findAll({
//     where: {id:req.user.id}
//   })
//   .then(user => {
//     user.getCars()
//     .then(cars => {
//       console.log(cars)
//     })
//   })
//   res.render('currentgarage', { make, model, description});
// })

app.get('/currentgarage', isLoggedIn, (req, res) => {
    db.user.findOne({
    where: {id:req.user.id},
    include: [{model: db.car, where:{garage:'current'}}]
  }).then (function(user) {
    console.log(user.cars)
    const { make, model, description} = [req.body.make, req.body.model, req.body.description]
    // console.log(make, model, description)
    res.render('currentgarage', { data: user.cars});
  })
})

app.get('/dreamgarage', isLoggedIn, (req, res) => {
  db.user.findOne({
  where: {id:req.user.id},
  include: [{model: db.car, where:{garage:'dream'}}]
}).then (function(user) {
  console.log(user.cars)
  const { make, model, description, garage} = [req.body.make, req.body.model, req.body.description, req.body.garage]
  // console.log(make, model, description)
  res.render('dreamgarage', { data: user.cars});
})
})

// app.get('/dreamgarage', (req, res) => { 
//   res.render('dreamgarage')
// })





// app.post('/addcars', (req, res) => {
//   db.addcars.findAll()
//   .then(result => {
//     console.log(result)
//   })
//   .catch(error => console.error(error))

// })




const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
