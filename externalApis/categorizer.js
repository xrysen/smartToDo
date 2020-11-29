

const request = require("request-promise-native");
// TODO 1. Refine Woflman Alphadog API call, this doesn't always return valuable info
const isTextBookOrMovieTitle = (text) => {
  console.log('--------called isbookormovie()-----');

  return request(`https://api.wolframalpha.com/v2/query?input=${text}&format=plaintext&output=json&appid=${process.env.API_KEY_WOLFRAMALPHA}`)
  .then(res => {
    res = JSON.parse(res);
    console.log('wolfram alpha response array res.queryresult.assumptions.values --------------\n', res.queryresult.assumptions.values);
    const wolframCatOptionsArr = res.queryresult.assumptions.values;
    for (const obj of wolframCatOptionsArr) {
      if (obj.name === 'Movie' || 'MovieClass') {
        return 'watch';
      }
      if (obj.name === 'Book' || 'BookClass') {
        return 'read'
      }
    }

    return '4';
  })
};

// TODO 2. Implement bookFinder and movieFinder API calls
const requestBookByTitle = (text) => {
  return request(`https://www.googleapis.com/books/v1/volumes?q=${text}`)
  .then(res => {
    res = JSON.parse(res);
    return 'read';
    // return res.items[0].volumeInfo.title;
  });
};

const searchForMovie = (text) => {
  return request(`http://www.omdbapi.com/?s=${text}&apikey=${process.env.API_KEY_OMDB}`)
  .then(res => {
    res = JSON.parse(res);
    return 'watch';
    // return res.Search[0].Title;
  })
};

// TODO 2. Implement location-finder function
const searchForRestaurant = (text, location) => {
  return request({
    url: `https://api.yelp.com/v3/businesses/search?term=${text}&location=${location}`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY_YELP}`
    }
  })
  .then(res => {
    res = JSON.parse(res);
    return 'eat';
    // return res.businesses[0].name;
  });
};

// 3. Set up call-sequence and promise-handling inside categorizeTask
module.exports = (taskText) => {
  // TODO:: replace random category with one from api calls
  // const category = Math.floor(Math.random()*4);

  console.log('task sent to categorizer is:::', taskText);
  return isTextBookOrMovieTitle(taskText)
      .then(data => {
        console.log('categorizer returns:::', data);
        switch (data) {
          case 'watch':
            return 1;
            break;

          case 'read':
            return 2;
            break;

          case 'eat':
            return 3;
            break;

          case 'buy':
            return 4;
            break;

        }
        return 4;
      });
};
