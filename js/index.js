import { toggleTheme } from "./header.js";
import { Movie, ActionMovie, ComedyMovie, User, Review } from './classes.js';

const API_KEY = 'fdff336b'; // omdb api key
const user = new User("You");
const movieList = document.getElementById("movie-list");
const form = document.getElementById("movie-form");
const filter = document.getElementById("filter");
const reviewForm = document.getElementById("review-form");
const reviewSection = document.getElementById("review-section");
const reviewList = document.getElementById("review-list");
const movieSelect = document.getElementById("movie-select");



// Fetch movie info from OMDB
async function fetchMovieData(title) {
  const res = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);
  const data = await res.json();
  return data;
}



// Add movie to collection
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;

  const data = await fetchMovieData(title);
  let movie;

  if (genre === "Action") {
    movie = new ActionMovie(data.Title, data.Director, data.Year, Math.floor(Math.random() * 10 + 1));
  } else if (genre === "Comedy") {
    movie = new ComedyMovie(data.Title, data.Director, data.Year, Math.floor(Math.random() * 10 + 1));
  } else {
    movie = new Movie(data.Title, data.Director, data.Year, data.Genre);
  }

  console.log(movie)
  user.addMovie(movie);
  displayMovies();
  form.reset();
});



// Filter movies by genre
filter.addEventListener("change", displayMovies);


// display movies
function displayMovies() {
  const selectedGenre = filter.value;
  movieList.innerHTML = "";

  const moviesToShow = selectedGenre === "All"
    ? user.collection
    : user.collection.filter(movie => movie.genre === selectedGenre);

  moviesToShow.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.textContent = movie.display();
    movieList.appendChild(div);
  });

  updateReviewDropdown()
}


document.addEventListener('DOMContentLoaded', function(){
    toggleTheme()
})

// from here

const reviews = []; // Will save Review instances here

// Show review section when movies are added
function updateReviewDropdown() {
  movieSelect.innerHTML = "";
  user.collection.forEach((movie, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = movie.title;
    movieSelect.appendChild(option);
  });

  if (user.collection.length > 0) {
    reviewSection.style.display = "block";
  }
}


// Review form handler
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const movieIndex = movieSelect.value;
  const movie = user.collection[movieIndex];
  const rating = parseInt(document.getElementById("rating").value);
  const comment = document.getElementById("comment").value;

  const review = new Review(user, movie, rating, comment);
  reviews.push(review);

//   saveData();
  displayReviews();
  reviewForm.reset();
});


// Show all reviews
function displayReviews() {
  reviewList.innerHTML = "<h3>Reviews</h3>";

  reviews.forEach((review) => {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.textContent = review.display();
    reviewList.appendChild(div);
  });
}
