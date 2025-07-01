import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';

const Home = ({
  theme,
  toggleTheme,
  movies,
  favorites,
  onToggleFavorite,
  onMovieClick,
  fetchMovies,
  genreList,
  selectedGenre,
  handleGenreSelect,
  query,
  setQuery, 
  page,
  isLoadingMore,
  totalPages,
  selectedMovie,
  showModal,
  setShowModal,
  fetchTrendingMovies,
}) => {
  const loadMoreRef = useRef(); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages && !isLoadingMore) {
          fetchMovies(query, page + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [query, page, totalPages, isLoadingMore, fetchMovies]);
  
  return (
    <div className={`app-container ${theme}`}>
      <div className="text-center my-3">
        <h1>🎬 CineScope</h1>
        <p className="tagline">Search & Save Your Favorite Movies</p>

        <div className="form-check form-switch d-flex justify-content-center align-items-center gap-2">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="themeSwitch"
            onChange={toggleTheme}
            checked={theme === 'light'}
          />
          <label className="form-check-label" htmlFor="themeSwitch">
            {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </label>
        </div>
        <Link to="/about" className="btn btn-outline-info btn-sm mt-3">
            ℹ️ About CineScope
        </Link>
    </div>

    <div className="d-flex flex-wrap justify-content-center align-items-start gap-3 mb-4">
      <div style={{ flexGrow: 1, maxWidth: '800px' }}>
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={fetchMovies}
        />
    </div>

  <select
    className="form-select"
    style={{ maxWidth: '200px' }}
    value={selectedGenre}
    onChange={(e) => handleGenreSelect(e.target.value)}
  >
    <option value="">🎯 Filter by Genre</option>
    {genreList.map((genre) => (
      <option key={genre.id} value={genre.id}>
        {genre.name}
      </option>
    ))}
  </select>

  {query && (
  <div className="text-center mt-2">
    <button
      className="btn btn-outline-secondary btn-sm"
      onClick={() => {
        setQuery('');
        fetchTrendingMovies(); // this should reset to trending
      }}
    >
      🔙 Back to Home
    </button>
  </div>
)}
</div>

<div>
  {/* 🔥 Trending Movies heading */}
  {!query && (
    <h4 className="text-center text-info mb-4">🔥 Trending Movies</h4>
  )}
</div>

      <MovieList
        movies={movies}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onMovieClick={onMovieClick}
        fetchMovies={fetchMovies}
        query={query}
        page={page}
        isLoadingMore={isLoadingMore}
        >
        <div ref={loadMoreRef} style={{ height: '60px' }}/>
        {isLoadingMore && (
          <div className="text-center text-muted">Loading more movies...</div>
        )}
      </MovieList>

      <h5 className="mt-5 text-secondary">🌟 My Watchlist</h5>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <MovieList
          movies={favorites}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onMovieClick={onMovieClick}
        />
      )}

      <MovieModal
        show={showModal}
        movie={selectedMovie}
        onClose={() => setShowModal(false)}
      />

    </div>
  );
};

export default Home;
