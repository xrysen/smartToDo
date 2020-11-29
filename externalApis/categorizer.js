

const request = require("request-promise-native");

// const requestBookByTitle = (title) => {
//   return request(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
//   .then(res => {
//     res = JSON.parse(res);
//     return res.items[0].volumeInfo.title;
//   });
// };

// const searchForMovie = (title) => {
//   return request(`http://www.omdbapi.com/?s=${title}&apikey=f3fb7868`)
//   .then(res => {
//     res = JSON.parse(res);
//     return res.Search[0].Title;
//   })
// };

// TODO::
// 1. Implement Woflman Alphadog API
const isTextBookOrMovieTitle = (text) => {
  console.log('--------called isbookormovie()-----');

  return request(`https://api.wolframalpha.com/v2/query?input=${text}&format=plaintext&output=json&appid=${process.env.API_KEY_WOLFRAMALPHA}`)
  .then(res => {
    res = JSON.parse(res);
    console.log('wolfram alpha response array res --------------\n', res);
    return '4';
  })
};

// 2. Implement location-finder function
const searchForRestaurant = (name, location) => {
  return request({
    url: `https://api.yelp.com/v3/businesses/search?term=${name}&location=${location}`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY_YELP}`
    }
  })
  .then(res => {
    res = JSON.parse(res);
    return res.businesses[0].name;
  });
};

// 3. Set up call-sequence and promise-handling inside categorizeTask
module.exports = (taskText) => {
  // TODO:: replace random category with one from api calls
  // const category = Math.floor(Math.random()*4);

  console.log('task sent to categorizer is:::', taskText);
  return (res, rej) => {
    isTextBookOrMovieTitle(taskText)
      .then(data => {
        console.log('categorizer returns:::', data);
        return data;
      });
    };
};
