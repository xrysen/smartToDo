const request = require("request-promise-native");

const compareStrings = (str1, str2) => {
  if (str1 === str2) return 2;
  if (str1.includes(str2)) return 1;
  return 0;
}

const requestBookByTitle = (bookTitle) => {
  return null
  return request(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`)
  .then(res => {
    res = JSON.parse(res);
    if (res.items.length) {
      console.log('read: ', res.items[0].volumeInfo.title);
      return compareStrings(res.items[0].volumeInfo.title.toLowerCase(), bookTitle.toLowerCase());
    }
    return 0;
  });
};


const requestMovieByTitle = (movieTitle) => {
  return null
  return request(`http://www.omdbapi.com/?s=${movieTitle}&page=1&apikey=${process.env.API_KEY_OMDB}`)
  .then(res => {
    res = JSON.parse(res);
    if (res.Response === "True" && res.Search.length) {
      console.log('watch: ', res.Search[0].Title);
      return compareStrings(res.Search[0].Title.toLowerCase(), movieTitle.toLowerCase());
    }
    return 0;
  })
};


const requestRestaurantByName = (name) => {
  return null
  // Ideally detect user's location via IP address, in this case hardcode
  const location = 'Vancouver, BC'

  return request({
    url: `https://api.yelp.com/v3/businesses/search?term=${name}&location=${location}&categories=restaurants&limit=1`,
    headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` }
  })
  .then(res => {
    res = JSON.parse(res);
    if (res.businesses.length) {
      console.log('eat: ', res.businesses[0].name);
      return compareStrings(res.businesses[0].name.toLowerCase(), name.toLowerCase());
    }
    return 0;
  });
};

/**
 * Input: str
 *  string text to search
 * Output:
 *  gathers relevant data from requests to Yelp, openMovieDatbase and Google's books APIs
 *  returns category_id (matching database) of
 *   1. category name which occurs twice in array, if any do, or
 *   2. category name which occurs first in array (Promise.all() order shows preference)
 *   3. default value of 'buy' if no other categories are found
 */
const requestAllApis = (str) => {
  return Promise.all([
    requestRestaurantByName(str),
    requestMovieByTitle(str),
    requestBookByTitle(str)
  ])
};


const calcCatIdFromApiResults = (apiHitsArr) => {
  const dbCategories = {
    watch: 1,
    read: 2,
    eat: 3,
    buy: 4,
  }

  const localCategories = ['eat', 'watch', 'read']

  // Set default categoryName of 'buy', overwritten if APIs return hits
  let categoryName = 'buy';
  for (const word of apiHitsArr) {
    if (word) {
      categoryName = word;
      break;
    }
  }
  // Loop through again, overwrite if exact match exists
  for (const word of apiHitsArr) {
    if (Array.isArray(word)) {
      categoryName = word[0];
      break;
    }
  }

  console.log('apiHitsArr::', apiHitsArr)
  console.log(categoryName, ':', dbCategories[categoryName])
  return dbCategories[categoryName]
}

//---------------------------------------------------
requestAllApis('starbucks')
.then(res => {
  return calcCatIdFromApiResults(res);
})
//---------------------------------------------------

module.exports = (text) => {
  const dbCategories = {
    watch: 1,
    read: 2,
    eat: 3,
    buy: 4,
  }

  return requestAllApis(text)
  .then(res => {
    let categoryName = 4;
    for (const word of res) {
      if (word) {
        categoryName = word;
        break;
      }
    }
    return dbCategories[categoryName]
  })
};
