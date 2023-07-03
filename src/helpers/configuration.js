export const API_URL = ``; // Removed for publishing

// CONFIGURATION //

// SEARCH
export const API_LIMIT = 'Slow Down - Too Many Requests!';
export const NO_CRITERIA = 'No Search Criteria';
export const NO_SEARCH = 'Try a Movie Title, Enter a Date, and the Data Will Be Shown Here!';

// MOVIE
export const INVALID = 'Rate Exceeded, or Invalid Query';

export const MOVIE_TABLE = {
    columns: [
        { headerName: 'ID', field: 'id', hide: true },
        { headerName: 'Role', field: 'role', resizable: true, sortable: true, filter: 'agTextColumnFilter', width: 300 },
        { headerName: 'Name', field: 'name', resizable: true, sortable: true, filter: 'agTextColumnFilter', width: 300 },
        { headerName: 'Characters', field: 'characters', resizable: true, filter: 'agTextColumnFilter', sortable: true, width: 300 }]

};

// ACTOR
export const INVALID_REQUEST = 'Incomplete Request';
export const INVALID_PAGE = 'No Record of Person with this ID';
export const TOKEN_EXPIRED = 'Invalid Token';

export const ACTOR_TABLE = {
    columns: [
        { headerName: 'Movie', field: 'movieName', resizable: true, sortable: true, filter: 'agTextColumnFilter', width: 300 },
        { headerName: 'Movie ID', field: 'movieId', resizable: true, sortable: true, hide: true, width: 300 },
        { headerName: 'Role', field: 'category', resizable: true, sortable: true, filter: 'agTextColumnFilter', width: 200 },
        { headerName: 'IMDB Rating', field: 'imdbRating', resizable: true, sortable: true, filter: 'agNumberColumnFilter', width: 300 },
        { headerName: 'Characters', field: 'roles', resizable: true, sortable: true, filter: 'agTextColumnFilter', width: 300 }]
};

// LOGIN & REGISTRATION

export const NO_INPUT = 'Input Username & Password';
export const USER_EXISTS = 'User Exists, Maybe Try Logging In?';
export const RATE_LIMITED = 'Sending Too Many Requests - Slow Down!';
export const WRONG_INPUT = 'Incorrect Email or Password'

export const INVALIDATED = 'Already Invalidated... Redirecting';
export const BAD_REQUEST = 'Already Logged Out... Redirecting';

export const SUCCESS = 'Success! ... Redirecting';

// INFINITE SCROLL
export const INFINITE_SCROLL = [
    { headerName: "Title", field: "title", resizable: true, width: 376 },
    { headerName: "Year", field: "year", resizable: true, width: 120 },
    { headerName: "IMDB Rating", field: "imdbRating", resizable: true, width: 200 },
    { headerName: "Rotten Tomatoes", field: "rottenTomatoesRating", resizable: true, width: 200 },
    { headerName: "Metacritic", field: "metacriticRating", resizable: true, width: 200 },
    { headerName: "Rating", field: "classification", resizable: true, width: 100 },
    { headerName: 'IMDBID', field: 'imdbID', hide: true },
];



