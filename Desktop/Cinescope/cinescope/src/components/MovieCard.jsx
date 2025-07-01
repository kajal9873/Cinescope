const MovieCard = ({ movie, favorites, onToggleFavorite, onMovieClick }) => {
  const isFav = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="col-md-3 mb-4">
      <div
        className="card h-100"
        style={{ cursor: 'pointer' }}
        onClick={() => onMovieClick(movie.id)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="card-img-top"
          alt={movie.title}
        />
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between align-items-center">
            {movie.title}
            <span
              onClick={(e) => {
                e.stopPropagation(); 
                onToggleFavorite(movie);
              }}
              style={{
                color: isFav ? 'red' : 'gold',
                fontSize: '1.5rem',
                transition: 'color 0.3s',
              }}
              title={isFav ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              {isFav ? '❤️' : '💛'}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
