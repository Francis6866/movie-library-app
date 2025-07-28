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
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const title = document.getElementById("title").value;
//   const genre = document.getElementById("genre").value;

//   const data = await fetchMovieData(title);
//   let movie;

//   if (genre === "Action") {
//     movie = new ActionMovie(data.Title, data.Director, data.Year, Math.floor(Math.random() * 10 + 1));
//   } else if (genre === "Comedy") {
//     movie = new ComedyMovie(data.Title, data.Director, data.Year, Math.floor(Math.random() * 10 + 1));
//   } else {
//     movie = new Movie(data.Title, data.Director, data.Year, data.Genre);
//   }

//   console.log(data)
//   user.addMovie(movie);
//   displayMovies();
//   form.reset();
// });
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errorMsg = document.getElementById("error-msg");
    errorMsg.textContent = ""; // clear any old errors
  
    const title = document.getElementById("title").value.trim();
    const genre = document.getElementById("genre").value;
  
    if (!title) {
      errorMsg.textContent = "Please enter a movie title.";
      return;
    }
  
    const data = await fetchMovieData(title);
  
    if (data.Response === "False") {
      errorMsg.textContent = `❌ ${data.Error || "Movie not found!"}`;
      return;
    }
  
    let movie;
  
    const poster = data.Poster !== "N/A"
    ? data.Poster
    : "https://via.placeholder.com/100x150?text=No+Image";
  
    if (genre === "Action") {
        movie = new ActionMovie(data.Title, data.Director, data.Year, Math.floor(Math.random() * 10 + 1), poster);
        } else if (genre === "Comedy") {
        movie = new ComedyMovie(data.Title, data.Director, data.Year, Math.floor(Math.random() * 10 + 1), poster);
        } else {
        movie = new Movie(data.Title, data.Director, data.Year, data.Genre, poster);
    }

  
    user.addMovie(movie);
    saveData();
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
    // div.className = "movie-card";
    // div.textContent = movie.display();
    div.innerHTML = `
                <div class="movie-row">
                    <img src="${movie.poster}" alt="${movie.title}" class="poster" />
                    <div>
                    <h3>${movie.title}</h3>
                    <p><strong>Genre:</strong> ${movie.genre}</p>
                    <p>${movie.display()}</p>
                    </div>
                </div>
                `;
    movieList.appendChild(div);
  });

  updateReviewDropdown()
}


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

// 
// 
// Review form handler
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const movieIndex = movieSelect.value;
  const movie = user.collection[movieIndex];
  const rating = parseInt(document.getElementById("rating").value);
  const comment = document.getElementById("comment").value;

  const review = new Review(user, movie, rating, comment);
  reviews.push(review);

//   reviewList.style.display = "block";
  saveData();
  displayReviews();
  reviewForm.reset();
});


// Show all reviews
function displayReviews() {
    const reviewList = document.getElementById("review-list");
  
    if (reviews.length === 0) {
      reviewList.style.display = "none";
      return;
    }
  
    reviewList.style.display = "block";
    reviewList.innerHTML = "<h3>Reviews</h3>";
  
    reviews.forEach((review) => {
      const div = document.createElement("div");
      div.className = "movie-card";
      div.textContent = review.display();
      reviewList.appendChild(div);
    });
  }
  

// save data to localStorage
function saveData() {
    const saved = {
      user: user.collection.map(m => ({
        title: m.title,
        director: m.director,
        year: m.year,
        genre: m.genre,
        poster: m.poster
      })),
      reviews: reviews.map(r => ({
        movieTitle: r.movie.title,
        rating: r.getRating(),
        comment: r.comment
      }))
    };
  
    localStorage.setItem("movieLibrary", JSON.stringify(saved));
  }
  
  
//   load data from localStorage and rendering them if available
function loadData() {
    const saved = JSON.parse(localStorage.getItem("movieLibrary"));
    if (!saved) return;
  
    saved.user.forEach(data => {
      let movie;
      const poster = data.poster || "https://via.placeholder.com/100x150?text=No+Image";
  
      if (data.genre === "Action") {
        movie = new ActionMovie(data.title, data.director, data.year, 5, poster);
      } else if (data.genre === "Comedy") {
        movie = new ComedyMovie(data.title, data.director, data.year, 5, poster);
      } else {
        movie = new Movie(data.title, data.director, data.year, data.genre, poster);
      }
  
      user.addMovie(movie);
    });
  
    saved.reviews.forEach(r => {
      const movie = user.collection.find(m => m.title === r.movieTitle);
      if (movie) {
        const review = new Review(user, movie, r.rating, r.comment);
        reviews.push(review);
      }
    });
  
    displayMovies();
    displayReviews();
    updateReviewDropdown();
  }
  
document.addEventListener('DOMContentLoaded', function(){
    toggleTheme()
})

  loadData()
