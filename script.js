document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    fetchMovies(query);
});

async function fetchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9ab42c263c9cde6b06b44b6486c431f5&query=${query}`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
        alert('Failed to fetch movies. Please try again later.');
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Release Date: ${movie.release_date}</p>
            </div>
        `;
        movieElement.addEventListener('click', () => fetchMovieDetails(movie.id));
        moviesContainer.appendChild(movieElement);
    });
}

async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9ab42c263c9cde6b06b44b6486c431f5`);
        const movie = await response.json();
        displayMovieDetails(movie);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        alert('Failed to fetch movie details. Please try again later.');
    }
}

function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movie-details');
    movieDetailsContainer.style.display = 'block';
    movieDetailsContainer.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
        <h2>${movie.title} (${movie.release_date})</h2>
        <p>${movie.overview}</p>
        <p><strong>Rating:</strong> ${movie.vote_average}</p>
    `;
}
