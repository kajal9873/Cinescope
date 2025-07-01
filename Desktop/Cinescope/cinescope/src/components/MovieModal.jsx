import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MovieModal = ({ show, onClose, movie }) => {
  if (!movie) return null;

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : '';

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {backdrop && (
          <img
            src={backdrop}
            alt="Backdrop"
            className="img-fluid mb-3 rounded"
          />
        )}
        <p><strong>⭐ Rating:</strong> {movie.vote_average}</p>
        <p><strong>📅 Release Date:</strong> {movie.release_date}</p>
        <p><strong>🎭 Genres:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
        <p><strong>📝 Overview:</strong> {movie.overview}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
