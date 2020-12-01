const request = require("request-promise-native");

/**
 * Input:
 *  two strings for comparison
 * Output:
 *  2 = exact match
 *  1 = partial match
 *  0 = no match
 */
const compareStrings = (str1, str2) => {
  if (str1 === str2) return 2;
  if (str1.includes(str2)) return 1;
  return 0;
}

/**
 * Input:
 *  book title or author (string)
 * Output:
 *  take first book title or author from Google Books API, return:
 *   2 = book title or author exists exactly matching input
 *   1 = book title or author exists partially matching input
 *   0 = no book with this title or author
 */
const requestBookByTitle = (titleOrAuthor) => {
  // return null
  return request(`https://www.googleapis.com/books/v1/volumes?q=${titleOrAuthor}`)
  .then(res => {
    res = JSON.parse(res);
    if (res.items.length) {
      console.log('read:', res.items[0].volumeInfo.title);
      return Math.max(
        compareStrings(res.items[0].volumeInfo.title.toLowerCase(), titleOrAuthor.toLowerCase()),
        compareStrings(res.items[0].volumeInfo.authors[0].toLowerCase(), titleOrAuthor.toLowerCase())
      )
    }
    return 0;
  });
};

/**
 * Input:
 *  movie title (string)
 * Output:
 *  take first movie title from openMovieDatabase API, return:
 *   2 = movie title exists exactly matching input
 *   1 = movie title exists partially matching input
 *   0 = no movie with this title
 */
const requestMovieByTitle = (movieTitle) => {
  // return 1
  return request(`http://www.omdbapi.com/?s=${movieTitle}&page=1&apikey=${process.env.API_KEY_OMDB}`)
  .then(res => {
    res = JSON.parse(res);
    if (res.Response === "True" && res.Search.length) {
      console.log('watch:', res.Search[0].Title);
      return compareStrings(res.Search[0].Title.toLowerCase(), movieTitle.toLowerCase());
    }
    return 0;
  })
};

/**
 * Input:
 *  restaurant name (string)
 * Output:
 *  take first restaurant name from Yelp API, return:
 *   2 = restaurant name exists exactly matching input
 *   1 = restaurant name exists partially matching input
 *   0 = no movie with this title
 */
const requestRestaurantByName = (name) => {
  // return 2
  // Ideally detect user's location via IP address, in this case hardcode
  const location = 'Vancouver, BC'

  return request({
    url: `https://api.yelp.com/v3/businesses/search?term=${name}&location=${location}&categories=restaurants&limit=1`,
    headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` }
  })
  .then(res => {
    res = JSON.parse(res);
    if (res.businesses.length) {
      console.log('eat:', res.businesses[0].name);
      return compareStrings(res.businesses[0].name.toLowerCase(), name.toLowerCase());
    }
    return 0;
  });
};

/**
 * Input: str
 *  string text to search
 * Output:
 *  gathers relevant data from requests to Yelp, openMovieDatabase and Google's books APIs
 *  returns category_id (matching database) of
 *   1. category name for which API had exact match compared to input string
 *   2. category name for which API had partial match compared to input string
 *   3. default value of 'buy' if no other categories are found
 */
module.exports = (query) => {
  // This must reflect database, format 'category_name: category_id'
  const dbCategories = {
    watch: 1,
    read: 2,
    eat: 3,
    buy: 4,
  }

  // Category priority, order of Promise.all() calls must reflect this array
  const localCategories = ['eat', 'watch', 'read']

  return Promise.all([
    requestRestaurantByName(query),
    requestMovieByTitle(query),
    requestBookByTitle(query)
  ])
  .then(res => {
    // Set default categoryName of 'buy', will be overwritten if any APIs return positive matches
    let categoryName = 'buy';
    const maxApiHits = Math.max(...res);
    if (maxApiHits) {
      categoryName = localCategories[res.findIndex(x => x === maxApiHits)]
    }

    console.log('apiHitsArr::', res)
    console.log('categoryName:', categoryName);
    console.log('category_id:', dbCategories[categoryName])
    return dbCategories[categoryName]
  })
};



/**
 * DEMO queries and their results:
 * watch  the wire
 * watch  godfather
 * watch  true blood
 * watch  harry potter
 * watch  guinness book of world records
 *
 * read   sapiens
 * read   the alchemist
 * read   why we sleep
 * read   douglas adams
 *
 * eat    starbucks
 * eat    donair dude
 * eat    cactus club
 * eat    McDonald's
 *
 * buy    new water bottle
 * buy    bluetooth earpods
 * buy    fishing rod
 * buy    whistler season pass
 */
