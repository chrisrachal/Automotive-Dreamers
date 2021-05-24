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
const fetch = require('node-fetch');
const methodOverride = require('method-override');
const SECRET_SESSION = process.env.SECRET_SESSION;

app.use(methodOverride('_method'));

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

app.get('/carinspiration', isLoggedIn, (req, res) => {
  res.render('carinspiration')
})

app.post('/carinspiration', isLoggedIn, async (req, res) => {
  //Hit the API and pass in the results from the form
  console.log(req.body)
  const response = await fetch(
    `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List_${req.body.make}?limit=10&keys=Make,Model`,
    {
      headers: {
        'X-Parse-Application-Id': process.env.X_PARSE_APPLICATION_ID, // This is your app's application id
        'X-Parse-REST-API-Key': process.env.X_PARSE_REST_API_KEY, // This is your app's REST API key
      }
    }
  );
  const {results} = await response.json(); // Here you have the data that you need
  // const [red, green] = results;
  console.log(results);
  res.render('results', {results});
})




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

app.get('/results', isLoggedIn, (req, res) => {
  res.render('results')
})

// app.get('/dreamgarage', (req, res) => { 
//   res.render('dreamgarage')
// })



app.delete('/dreamgarage', isLoggedIn, (req, res) => {
  // console.log(req.body.)
  db.car.findOne({
    where: {id: req.body.id}
  }) //creates car on add cars page
  .then(foundCar => {
      console.log(foundCar);
      db.user.findByPk(req.user.id) //finds user
      .then(foundUser => {
          console.log(foundUser);
          foundUser.removeCar(foundCar)
          .then(removedCar => {
            res.redirect('/dreamgarage')
          })
      })
  
  })
  .catch(err => {
      console.log(err);
      res.redirect('/cars')
  })
})


app.delete('/currentgarage', isLoggedIn, (req, res) => {
  // console.log(req.body.)
  db.car.findOne({
    where: {id: req.body.id}
  }) //creates car on add cars page
  .then(foundCar => {
      console.log(foundCar);
      db.user.findByPk(req.user.id) //finds user
      .then(foundUser => {
          console.log(foundUser);
          foundUser.removeCar(foundCar)
          .then(removedCar => {
            res.redirect('/currentgarage')
          })
      })
  })
  .catch(err => {
      console.log(err);
      res.redirect('/cars')
  })
})


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

//STASH

// app.post('/carinspiration', isLoggedIn, async (req, res) => {
//   //Hit the API and pass in the results from the form
//   console.log(req.body)
//   const response = await fetch(
//     `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List_${req.body.make}?limit=10&keys=Make,Model`,
//     {
//       headers: {
//         'X-Parse-Application-Id': process.env.X_PARSE_APPLICATION_ID, // This is your app's application id
//         'X-Parse-REST-API-Key': process.env.X_PARSE_REST_API_KEY, // This is your app's REST API key
//       }
//     }
//   );
//   const {results} = await response.json(); // Here you have the data that you need
//   const {make, model} = [res.Make, res.Model]
//   console.log(results);
//   res.render('results', {results});
  
// })