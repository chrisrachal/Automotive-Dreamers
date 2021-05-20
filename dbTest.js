const db = require("./models");

const fetchAllCars = () => {
    db.car.findAll()
    .then(cars => {
      console.log(cars);
    })
  }
  // fetchAllCars();
  
function addNewCar () {
    db.car.create({
        make: 'BMW',
        model: 'M3',
        description: 'V8'
    })
    .then(newCar => {
        console.log(newCar);
    })
    .catch(err => {
        console.log(err);
    })
}  
// addNewCar();

function fetchCars () {
    db.car.findAll()
    .then(cars => {
        console.log(cars);
    })
    .catch(err => {
        console.log(err);
    })
}
// fetchCars();

function findCars(){
db.user.findOne({
    where: { id: 3 },
    include: [db.car]
  }).then(function(user) {
    // by using eager loading, the article model should have a comments key
    console.log(user.cars)
  })
}
findCars();