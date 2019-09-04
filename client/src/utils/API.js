import axios from "axios";
// import { stringify } from "querystring";

export default {
  // Gets books from the Google API
  getJobs: function(q, l, s) {
    //return axios.get(`https://indreed.herokuapp.com/api/jobs?q=${q}&l=${l}`);
    return axios.get(`/api/jobs?q=${q}&l=${l}&s=${s.join("-")}`);
  },
  // // Gets all saved books
  // getSavedBooks: function() {
  //   return axios.get("/api/books");
  // },
  // // Deletes the saved book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves an book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // }
  postSignup: function (data) {
    return axios.post("/api/users",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },
  postLogin: function (data) {
    return axios.post("/api/users/login",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },
  getCurrent: function () {
    return axios.get("/api/users/current")

  },

  //////////////////favorite jobs//////////////////////
  postUserJob: function(data) {
    // return axios.get("/api/userJobs", 
    return axios.post("/api/jobs/favorite", 
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },

  getFavorites: function(data) {
    // console.log("GET FAVORITES: ", data);
    return axios.post("/api/jobs/getFavorites",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },

  removeFavorite: function(data) {
        console.log("GET FAVORITES: ", data);

    return axios.post("/api/jobs/removeFavorite",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },

  updateFavorite: function(data) {
    console.log("move FAVORITE: ", data);

    return axios.post("/api/jobs/updateTracked",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },

  createNote: function(data) {
    console.log("create Note: ", data);
    return axios.post("/api/jobs/createNote",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
};
