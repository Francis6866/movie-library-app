// movie class constructor
export class Movie {
    constructor(title, director, year, genre, poster){
        this.title = title;
        this.director = director;
        this.year = year;
        this.genre = genre;
        this.poster = poster;
    }

    display() {
        return `${this.title} directed by ${this.director} (${this.year})`;
      }
}

// user's class constructor
export class User {
    constructor(name){
        this.name = name;
        this.collection = []
    }

    addMovie(movie) {
        this.collection.push(movie);
      }
}


// Review class with private rating field
export class Review {
    #rating;

    constructor(user, movie, rating, comment){
        this.user = user;
        this.movie = movie;
        this.#rating = rating;
        this.comment = comment
    }

    getRating() {
        return this.#rating;
      }
    
    display() {
        return `${this.user.name} rated "${this.movie.title}" ${this.#rating} stars - "${this.comment}"`;
      }
}

// 
// 
// 
// Inherited classes for different genres

// Action movie class
export class ActionMovie extends Movie {
    constructor(title, director, year, actionLevel, poster){
        super(title, director, year, 'Action', poster)
        this.actionLevel = actionLevel;
    }

    display() {
        return `🔥 ACTION: ${this.title} - ${this.actionLevel} explosions!`;
      }
}


// Comedy movie class
export class ComedyMovie extends Movie{
    constructor(title, director, year, humorLevel, poster){
        super(title, director, year, 'Comedy', poster)
        this.humorLevel = humorLevel;
    }

    display() {
        return `😂 COMEDY: ${this.title} - ${this.humorLevel} jokes!`;
      }
}