const request = require("request-promise-native");

const requestWolframDatatype = (text) => {
  return request(`https://api.wolframalpha.com/v2/query?input=${text}&format=plaintext&output=json&appid=${process.env.API_KEY_WOLFRAMALPHA}`)
  .then(res => {
    res = JSON.parse(res);
    if (res.queryresult.assumptions) {
      for (const obj of res.queryresult.assumptions.values) {
        if (['RetailLocationClass'].includes(obj.name)) {
          return 'eat';
        }
        if (['Movie','MovieClass'].includes(obj.name)) {
          return 'watch';
        }
        if (['Book','BookClass'].includes(obj.name)) {
          return 'read';
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
      return 'read';
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
      return 'watch';
}
  })
};


const requestRestaurantByName = (name) => {
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
      return 'eat';
}
  });
};

/**
 * Input: str
 *  string text to search
 * Output:
 *  sends a request to Wolfram Alpha, Yelp, openMovieDatbase and Google books APIs
 *  returns an array of category names if API has returned a positive result
 *  e.g. [ 'read', 'null', 'watch', 'read' ]
 */
const requestAllApis = (str) => {
  return Promise.all([
    requestWolframDatatype(str),
    requestRestaurantByName(str),
    requestMovieByTitle(str),
    requestBookByTitle(str)
  ])
};

/**
 * Input:
 *  array of return values from all API calls
 * Output:
 *  category_id (from database) of
 *   1. category name which occurs twice in array, if any do, or
 *   2. category name which occurs first in array (Promise.all() order shows preference)
 */
const catIdFromApiResults = (arr, dbCatNames, countApiHits) => {
  arr.forEach(apiHit => {
    const i = dbCatNames.findIndex(dbName => dbName === apiHit);
    if (i !== -1) {
      countApiHits[i] ++;
    }
  })
  const maxApiHits = Math.max(...countApiHits);
  const categoryIdZeroIndex = countApiHits.findIndex(x => x === maxApiHits);
  const category_id = categoryIdZeroIndex + 1
  return category_id;
}


module.exports = (text) => {
  /*
   * IMPORTANT
   * 2 arrays defined below:
   *  dbCatNames: category names which implicitly match db.category_name
   *  countApiHits: count APIs that have returned the corresponding category name
   * */
  const dbCatNames = ['watch', 'read', 'eat', 'buy'];
  const countApiHits = [0, 0, 0, 0];

  return requestAllApis(text)
  .then(res => {
    return catIdFromApiResults(res, dbCatNames, countApiHits)
  })
};
