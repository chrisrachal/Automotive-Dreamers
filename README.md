# Automotive Dreamers

https://automotive-dreamers.herokuapp.com/

## What is Automotive Dreamers?

Automotive Dreamers is an application that was created to bring car enthusiasts together through their love of cars.

### How to use

* Create an account and log in
* Start by navigating to the add cars section and add cars to your garages
* If you need a little inspiration for a car model you'd like to add, search for a car through the car inspiration tab

#### Code Snippets

```js
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

```

```js
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
```



##### Future Considerations

I'd like to give users the ability to add profile pictures and car images

Add a chatting/comment ability to a garage

Add a top garages section based on amount of likes
