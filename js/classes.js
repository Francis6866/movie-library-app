// movie class constructor
export class Movie {
    constructor(title, director, year, genre){
        this.title = title;
        this.director = director;
        this.year = year;
        this.genre = genre;
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
    constructor(title, director, year, actionLevel){
        super(title, director, year, 'Action')
        this.actionLevel = actionLevel;
    }

    display() {
        return `🔥 ACTION: ${this.title} - ${this.actionLevel} explosions!`;
      }
}


// Comedy movie class
export class ComedyMovie extends Movie{
    constructor(title, director, year, humorLevel){
        super(title, director, year, 'Comedy')
        this.humorLevel = humorLevel;
    }

    display() {
        return `😂 COMEDY: ${this.title} - ${this.humorLevel} jokes!`;
      }
}