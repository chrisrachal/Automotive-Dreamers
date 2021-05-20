const db = require('./models');

const fetch = require('node-fetch');
const { default: axios } = require('axios');
const router = require('./controllers/auth');
// const APIKey = process.env.API_KEY;

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

// (async () => {
//     const response = await fetch(
//       'https://parseapi.back4app.com/classes/Carmodels_Car_Model_List_McLaren?limit=10&excludeKeys=Year',
//       {
//         headers: {
//           'X-Parse-Application-Id': 'L07uNhcWYXFfffuSH2ibNiOgqTDXj5HPhcPWV74i', // This is your app's application id
//           'X-Parse-REST-API-Key': 'WiNz0ugnqWcxoXhe6WXPdwnzMSDgvqWg7tA0tb2A', // This is your app's REST API key
//         }
//       }
//     );
//     const data = await response.json(); // Here you have the data that you need
//     console.log(JSON.stringify(data, null, 2));
//   })();

//   axios.get('https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=10')

// axios.get('https://parseapi.back4app.com/classes/Carmodels_Car_Model_List_McLaren?limit=10&keys=Make,Model')

// (async () => {
//   const response = await fetch(
//     `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List_${carName}limit=10&keys=Make,Model`,
//     {
//       headers: {
//         'X-Parse-Application-Id': 'L07uNhcWYXFfffuSH2ibNiOgqTDXj5HPhcPWV74i', // This is your app's application id
//         'X-Parse-REST-API-Key': 'WiNz0ugnqWcxoXhe6WXPdwnzMSDgvqWg7tA0tb2A', // This is your app's REST API key
//       }
//     }
//   );
//   const data = await response.json(); // Here you have the data that you need
//   console.log(JSON.stringify(data, null, 2));
// })();

router.get('/addcars', async (req, res) => {
  console.log(req.query.search);
  const results = await axios.get('https://parseapi.back4app.com/classes/Car_Model_List_BMW/m3')
  console.log(results.data.search)
  res.render('/addcars', { carResults: results.data.search ? results.data.search : [] });
})