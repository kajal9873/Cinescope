import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'; 

const About = () => {
  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <div className="text-center mb-3">
          <Link to="/" className="btn btn-primary">🔙 Back to Home</Link>
        </div>
        <h2 className="text-primary">About CineScope</h2>
        <p>
          <strong>CineScope</strong> is a movie discovery web application built with React and TMDB API. 
          It allows users to search trending movies, view details, filter by genre, and save favorites — all in a clean and modern UI.
        </p>

        <h4 className="text-success mt-4">✨ Features</h4>
        <ul>
          <li>🎬 Displays trending and searched movies in a responsive grid.</li>
          <li>🔍 Real-time search with animated suggestions.</li>
          <li>❤️ Save your favorite movies to a watchlist</li>
          <li>🎭 Filter movies by genre (Action, Comedy, Horror, etc.).</li>
          <li>🌚 Dark/Light mode toggle.</li>
          <li>📄 View detailed movie modal with overview, genres, ratings.</li>
          <li>🔙 Go back to Trending from search results</li>
          <li>📱 Fully responsive design for all devices</li>
        </ul>

        <h4 className="text-info mt-4">👩‍💻 Developer Info</h4>
        <ul>
          <li><strong>Name:</strong> Kajal Kumari</li>
          <li><strong>Year:</strong> Second Year</li>
          <li><strong>Course:</strong> B.Tech (CSE - AI)</li>
          <li><strong>Batch:</strong> 2023 - 2027</li>
          <li><strong>Email:</strong> kajal080btcseai23@igdtuw.ac.in</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
