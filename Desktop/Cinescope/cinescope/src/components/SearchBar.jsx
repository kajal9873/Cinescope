import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ query, setQuery, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 400);
    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchSuggestions = async (text) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${text}`
      );
      const data = await res.json();
      setSuggestions(data.results?.slice(0, 5) || []);
    } catch (err) {
      console.error('Error fetching suggestions', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
    setSuggestions([]);
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    onSearch(title);
    setSuggestions([]);
  };

  return (
    <div className="search-bar-container position-relative mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control custom-search-input"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>

        {suggestions.length > 0 && (
          <ul className="suggestion-box list-group position-absolute w-100">
            {suggestions.map((movie) => (
              <li
                key={movie.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSuggestionClick(movie.title)}
              >
                🎬 {movie.title}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
