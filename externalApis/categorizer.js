const request = require("request-promise-native");

const isWolframDatatype = (text) => {
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
 *  ...TODO...
 */
const requestAllApis = (str) => {
  Promise.all([
    requestWolframDatatype(str),
    requestRestaurantByName(str),
    requestMovieByTitle(str),
    requestBookByTitle(str)
  ])
  .then(res => {
    console.log('res::', res)
  });
};

// console.log(getCategoryNameFromApis('harry potter'));

module.exports = (str) => {
  const dbCatNames = ['dummy', 'watch', 'read', 'eat', 'buy'];
  const countApiHits = ['dummy', 0, 0, 0, 0];
  console.log('countApiHits was::', countApiHits);

  return requestAllApis(str)
  .then(res => {
    res.forEach(apiHit => {
      countApiHits[dbCatNames.findIndex(apiHit)] ++;
    })
    console.log('countApiHits is now::', countApiHits);
    return countApiHits.findIndex(Math.max(...countApiHits));
  })
};
