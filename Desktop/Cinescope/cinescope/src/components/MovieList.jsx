import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, favorites, onToggleFavorite, onMovieClick, fetchMovies, query, page, isLoadingMore, totalPages }) => {
  return (
    <>
      <div className="row">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onMovieClick={onMovieClick}
          />
        ))}
      </div>

    </>
  );
};

export default MovieList;
