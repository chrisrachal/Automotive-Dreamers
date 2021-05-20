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
    db.car.create(req.body)
    .then(newCar => {
        console.log(newCar);
        db.user.findByPk(req.user.id)
        .then(foundUser => {
            console.log(foundUser);
            foundUser.addCar(newCar)
            .then(addedCar => {
                res.send(addedCar)
            })
        })
    
    })
    .catch(err => {
        console.log(err);
        res.redirect('/cars')
    })
})
router.get('/addcars', isLoggedIn, (req, res) => {
    db.car.findAll()
    .then(cars => {
        console.log(cars)
    })
    .catch(err => {
        console.log(err)
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