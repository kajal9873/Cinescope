import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState('dark');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const fetchTrendingMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    const data = await res.json();
    setMovies(data.results || []);
  };

  const fetchMovies = async (searchQuery = query, newPage = 1) => {
    if (!searchQuery.trim()) return;

    if (newPage === 1) setMovies([]);
    setIsLoadingMore(true);

    const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchQuery}&page=${newPage}`
    );
    const data = await res.json();

    setMovies((prev) =>
      newPage === 1 ? data.results : [...prev, ...data.results]
    );
    setPage(newPage);
    setTotalPages(data.total_pages || 1);
    setIsLoadingMore(false);
  };


  const handleGenreSelect = async (genreId) => {
    setSelectedGenre(genreId);
    if (!genreId) return fetchTrendingMovies();

    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genreId}`
    );
    const data = await res.json();
    setMovies(data.results || []);
  };

  const handleMovieClick = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    const data = await res.json();
    setSelectedMovie(data);
    setShowModal(true);
  };

  const toggleFavorite = (movie) => {
    const updated = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      const data = await res.json();
      setGenreList(data.genres || []);
    };

    fetchTrendingMovies();
    fetchGenres();
    const fav = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(fav);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              theme={theme}
              toggleTheme={toggleTheme}
              movies={movies}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onMovieClick={handleMovieClick}
              fetchMovies={fetchMovies}
              genreList={genreList}
              selectedGenre={selectedGenre}
              handleGenreSelect={handleGenreSelect}
              query={query}
              setQuery={setQuery}
              page={page}
              isLoadingMore={isLoadingMore}
              totalPages={totalPages}
              selectedMovie={selectedMovie}
              showModal={showModal}
              setShowModal={setShowModal}
              fetchTrendingMovies={fetchTrendingMovies}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
