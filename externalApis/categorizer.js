const request = require("request-promise-native");

// Global object to track number of times each category is found
const categoriesFound = {
  eat: 0,
  watch: 0,
  read: 0,
  buy: 0,
};

const isWolframDatatype = (text) => {
  return request(`https://api.wolframalpha.com/v2/query?input=${text}&format=plaintext&output=json&appid=${process.env.API_KEY_WOLFRAMALPHA}`)
  .then(res => {
    res = JSON.parse(res);
    if (res.queryresult.assumptions) {
      for (const obj of res.queryresult.assumptions.values) {
        if (['RetailLocationClass'].includes(obj.name)) {
          categoriesFound.eat ++;
          return;
        }
        if (['Movie','MovieClass'].includes(obj.name)) {
          categoriesFound.watch ++;
          return;
        }
        if (['Book','BookClass'].includes(obj.name)) {
          categoriesFound.read ++;
          return;
        }
      }
    }
    return null;
  })
};

const requestBookByTitle = (title) => {
  return request(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
  .then(res => {
    res = JSON.parse(res);
    if (res.items[0].volumeInfo.title.toLowerCase().includes(title.toLowerCase())) {
      categoriesFound.read ++;
      return;
    } else {
      return null;
    }
  });
};


const requestMovieByTitle = (title) => {
  return request(`http://www.omdbapi.com/?s=${title}&page=1&apikey=${process.env.API_KEY_OMDB}`)
  .then(res => {
    res = JSON.parse(res);
    if (res.Response === "False") {
      return null;
    } else {
      categoriesFound.watch ++;
      return;
}
  })
};


const requestRestaurantByNameAndLoc = (name) => {
  // Ideally detect user's location via IP address, in this case hardcode
  const location = 'Vancouver, BC'

  return request({
    url: `https://api.yelp.com/v3/businesses/search?term=${name}&location=${location}&categories=restaurants&limit=1`,
    headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` }
  })
  .then(res => {
    res = JSON.parse(res);
    if (!res.businesses.length || !res.businesses[0].name.toLowerCase().includes(name.toLowerCase())) {
      return null;
    }
    else {
      categoriesFound.eat ++;
      return;
}
  });
};

/**
 * requestAll (name, location)
 * Input:
 *  string text to search, location of user searching
 * Output:
 *  Sends a request to Yelp, openMovieDatbase and Google books returning an array of values for each category if any of the api's get a hit
 * [yelpResponse, movieResponse, booksResponse] Will either show as either TRUE or NULL if the api couldn't provide a result
 */

const requestAll = (name) => {
  // catArr *must* be in the same order as category_id in database
  // CURRENT SETUP [eat, watch, read, buy];


  Promise.all([
    isWolframDatatype(name),
    requestRestaurantByNameAndLoc(name),
    requestMovieByTitle(name),
    requestBookByTitle(name)
  ])
  .then(res => {
    // Get 'most found' value in categoriesFound

    // Get key for 'most found' value

    // Translate key --> category_id according to DB seeds order


    return category_id;
    // return res.map(data => data);
  })
  .then(data => {
    // console.log(`Eat: ${data[0]} Watch: ${data[1]} Read ${data[2]}`);
    console.log('categoriesFound::', categoriesFound);
    //return data;
  });
};

requestAll("harry potter","vancouver");


module.exports = (taskText) => {
  return requestAll(taskText)
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
