const express = require('express');
// const { notBetween } = require('sequelize/types/lib/operators');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn')

const db = require('../models');


router.get('/addcars', isLoggedIn, (req, res) => { 
    res.render('addcars')
  })


router.post('/addcars', isLoggedIn, (req,res) => {
    console.log(req.body)
    db.car.create(req.body) //creates car on add cars page
    .then(newCar => {
        console.log(newCar);
        db.user.findByPk(req.user.id) //finds user
        .then(foundUser => {
            console.log(foundUser);
            foundUser.addCar(newCar)
            .then(addedCar => {
              if (req.body.garage === 'current'){ //redirects to current garage is selected, else redirect to dream garage
                res.redirect('/currentgarage')
              } else {
                res.redirect('/dreamgarage')
              }
            })
        })
    
    })
    .catch(err => {
        console.log(err);
        res.redirect('/cars')
    })
})



router.get('/currentgarage', isLoggedIn, (req, res) => {
//     db.car.findAll({
//       where: {userId: req.user.id, garage: 'current'}
//     })
//     .then(cars => {
//         console.log(cars)
//     })
//     .catch(err => {
//         console.log(err)
//     })
      db.user.findOne({
        where: {id:req.user.id}
      })
      .then(user => {
        user.getCars()
        .then(cars => {
          console.log(cars)
        })
      })
})

router.get('/dreamgarage', isLoggedIn, (req, res) => {
  //     db.car.findAll({
  //       where: {userId: req.user.id, garage: 'current'}
  //     })
  //     .then(cars => {
  //         console.log(cars)
  //     })
  //     .catch(err => {
  //         console.log(err)
  //     })
        db.user.findOne({
          where: {id:req.user.id}
        })
        .then(user => {
          user.getCars()
          .then(cars => {
            console.log(cars)
          })
        })
  })

 

module.exports = router;


//Stash
// router.post('/', async (req,res) => {
//     const [category, created] = await db.category.findOrCreate({
//       where: {name: req.body.category},
//       defaults: {name: req.body.category}
//     })
// router.post('/', async (req,res) => {
//     const [category, created] = await db.category.findOrCreate({
//       where: {name: req.body},
//       defaults: {name: req.body}
//     })
// })
// router.get('/:id', isLoggedIn, (req, res) => {
//   db.user.findOne({
//     include: [db.car],
//     where: {id: req.params.id}
//   }).then((author) => {
//     res.render('authors/show', { author: author })
//   }).catch((error) => {
//     console.log(error)
//     res.status(400).render('main/404')
//   })
// })