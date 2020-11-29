const request = require("request-promise-native");

const requestBookByTitle = (title) => {
  return request(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
  .then(res => {
    res = JSON.parse(res);
    return res.items[0].volumeInfo.title;
  });
};

const searchForMovie = (title) => {
  return request(`http://www.omdbapi.com/?s=${title}&apikey=f3fb7868`)
  .then(res => {
    res = JSON.parse(res);
    return res.Search[0].Title;
  })
};

const searchForRestaurant = (name, location) => {
  return request({
    url: `https://api.yelp.com/v3/businesses/search?term=${name}&location=${location}`,
    headers: {
      Authorization: "Bearer THulhPaLp88DDUfXjuTXcPD3c7p0mG_rWdnClac06zhwno9pgOofPKMrv8hJ3yIwIAIcUAW_qf2nGWWwcIRDUQznYVTyffJt22LkyZUmk2LtwkVmpE9mk7RnYq3CX3Yx"
    }
  })
  .then(res => {
    res = JSON.parse(res);
    return res.businesses[0].name;
  });
};

module.exports = {
  requestBookByTitle,
  searchForMovie,
  searchForRestaurant
}

// const test = searchForMovie("Friday the 13th");
// test.then ((result) => {
//   console.log(result);
// });

//searchForRestaurant("starbucks", "vancouver");
