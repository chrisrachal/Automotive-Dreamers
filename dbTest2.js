const db = require('./models');

const fetch = require('node-fetch');


// (async () => {
//     const where = encodeURIComponent(JSON.stringify({
//       "Model": {
//         "$exists": true
//       }
//     }));
//     const response = await fetch(
//       `https://parseapi.back4app.com/classes/Car_Model_List_BMW?limit=20&order=Model&excludeKeys=Category&where=${where}`,
//       {
//         headers: {
//           'X-Parse-Application-Id': '', // This is the fake app's application id
//           'X-Parse-Master-Key': '', // This is the fake app's readonly master key
//         }
//       }
//     );
//     const data = await response.json(); // Here you have the data that you need
//     console.log(JSON.stringify(data, null, 2));
//   })();
// (async () => {
//     const response = await fetch(
//       'https://parseapi.back4app.com/classes/Car_Model_List_BMW/m3',
//       {
//         headers: {
//           'X-Parse-Application-Id': '', // This is the fake app's application id
//           'X-Parse-Master-Key': '', // This is the fake app's readonly master key
//         }
//       }
//     );
//     const data = await response.json(); // Here you have the data that you need
//     console.log(JSON.stringify(data, null, 2));
//   })();

(async () => {
    const response = await fetch(
      'https://parseapi.back4app.com/classes/Carmodels_Car_Model_List_McLaren?limit=10&excludeKeys=Year',
      {
        headers: {
          'X-Parse-Application-Id': '', // This is your app's application id
          'X-Parse-REST-API-Key': '', // This is your app's REST API key
        }
      }
    );
    const data = await response.json(); // Here you have the data that you need
    console.log(JSON.stringify(data, null, 2));
  })();