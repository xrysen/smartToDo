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
      return categoriesFound;
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
      return categoriesFound;
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
      categoriesFound.eat ++;
      return categoriesFound;
}
  });
};

/**
 * Global: categoriesFound obj
 *  initializes object of category names (representative of categories in database) each with 'counter' of 0
 * Input: str
 *  string text to search
 * Output:
 *  sends a request to Wolfram Alpha, Yelp, openMovieDatbase and Google books APIs
 *  increments categoriesFound obj if API returns a hit for str from that API (e.g. Yelp increments 'eat' category)
 */
const getCategoryNameFromApis = (str) => {
  Promise.all([
    requestWolframDatatype(str),
    requestRestaurantByName(str),
    requestMovieByTitle(str),
    requestBookByTitle(str)
  ])
  .then(res => res)
  .then(res => {
    console.log('res::', res)
    // Get highest counter value in categoriesFound
    const categoriesFoundCounts = Object.values(categoriesFound);
    const maxCategoryCount = Math.max(...categoriesFoundCounts);
    console.log('categoriesFoundCounts::', categoriesFoundCounts);

    // Get category name for 'most found' category count
    const category = Object.keys(categoriesFound).find(key => {
      return categoriesFound[key] === maxCategoryCount;
    })
    console.log('category::', category);
    return category;
  });
};

// console.log(getCategoryNameFromApis('harry potter'));

module.exports = (str) => {
  return getCategoryNameFromApis(str)
  .then(category => {
    // Translate category name to category_id according to DB seeds order
    console.log('categorizer will return:::', category);
    switch (category) {
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
  })
};
