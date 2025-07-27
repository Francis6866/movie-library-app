import { toggleTheme } from "./header.js";
import { Movie, ActionMovie, ComedyMovie, User, Review } from './classes.js';

const API_KEY = 'fdff336b'; // omdb api key
const user = new User("You");
const movieList = document.getElementById("movie-list");
const form = document.getElementById("movie-form");
const filter = document.getElementById("filter");



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
}




document.addEventListener('DOMContentLoaded', function(){
    toggleTheme()
})