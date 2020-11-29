const request = require("request-promise-native");
// TODO 1. Refine Woflman Alphadog API call, this doesn't always return valuable info
const isTextBookOrMovieTitle = (text) => {
  console.log('--------called isbookormovie()-----');

  return request(`https://api.wolframalpha.com/v2/query?input=${text}&format=plaintext&output=json&appid=${process.env.API_KEY_WOLFRAMALPHA}`)
  .then(res => {
    res = JSON.parse(res);
    // console.log('wolfram alpha response res= --------------\n', res);
    // console.log('wolfram alpha response array res.queryresult.assumptions.values= --------------\n', res.queryresult.assumptions.values);
    const wolframCatOptionsArr = res.queryresult.assumptions.values;
    for (const obj of wolframCatOptionsArr) {
      if (obj.name === 'Movie' || 'MovieClass') {
        return 'watch';
      }
      if (obj.name === 'Book' || 'BookClass') {
        return 'read'
      }
    }
    return null;
  })
};

// TODO 2. Implement bookFinder and movieFinder API calls
const requestBookByTitle = (title) => {
  return request(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
  .then(res => {
    res = JSON.parse(res);
    console.log('-----googleapis/books response res.items[0].volumeInfo.title= --------------\n', res.items[0].volumeInfo.title);
    //console.log('-----googleapis/books response res.items[1].volumeInfo.title= --------------\n', res.items[1].volumeInfo.title);
    //const googleBooksOptionsArr = res.items;
    // for (const obj of googleBooksOptionsArr) {
    //   if (obj.volumeInfo.title === title) {
    //     return 'read';
    //   }
    // }
    if (res.items[0].volumeInfo.title.toLowerCase().includes(title.toLowerCase())) {
      return 'read';
    } else {
      return null;
    }
    // return res.items[0].volumeInfo.title;
  });
};


const requestMovieByTitle = (title) => {
  return request(`http://www.omdbapi.com/?s=${title}&page=1&apikey=${process.env.API_KEY_OMDB}`)
  .then(res => {
    res = JSON.parse(res);
    //console.log('omdbapi response res= --------------\n', res);
    const omdbOptionsArr = res.Search;
    // for (const obj of omdbOptionsArr) {
    //   if (obj.Title === title) {
    //     return 'watch';
    //   }
    // }
    if (res.Response === "False") {
      return null
    } else {
      return 'watch';
    }
  })
};


// TODO 2. Implement location-finder function
const requestRestaurantByNameAndLoc = (name, location) => {
  console.log('--------called requestRestaurantByNameAndLoc()-----');

  return request({
    url: `https://api.yelp.com/v3/businesses/search?term=${name}&location=${location}&categories=restaurants&limit=1`,
    headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` }
  })
  .then(res => {
    res = JSON.parse(res);
    console.log('yelp response res= --------------\n', res);
    if (!res.businesses.length || !res.businesses[0].name.toLowerCase().includes(name.toLowerCase())) {
      return null;
    }
    else {
      return 'eat';
    }
    // return res.businesses[0].name;
  });
};

const requestAll = (name, location) => {
  Promise.all([
    //isTextBookOrMovieTitle(name),
    requestRestaurantByNameAndLoc(name, location),
    requestMovieByTitle(name),
    requestBookByTitle(name)
  ])
  .then(res => {
    return Promise.all(res.map(data => data));
  })
  .then(data => {
    console.log(data);
    //return data;
  });
};

// requestAll("IT","vancouver");

// 3. Set up call-sequence and promise-handling inside categorizeTask
module.exports = (taskText) => {
  // TODO:: replace random category with one from api calls
  // const category = Math.floor(Math.random()*4);

  // console.log('task sent to categorizer is:::', taskText);

  //

  return requestMovieByTitle(taskText)
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

          default:
            return 4;
        }
      });
};
