// Create IMDB Ratings Array for D3 Graph
export const getData = (setRatings, rowData) => {
    let localRatings = [];
    for (let i = 0; i < rowData.length; i++) {
        localRatings.push(rowData[i].imdbRating);
    }

    setRatings(localRatings);
};