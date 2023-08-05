import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import getFilmInfo from './getFilmInfo';

const API_URL = 'http://localhost:5000/wishlist';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [newFilm, setNewFilm] = useState('');
  const [error, setError] = useState('');

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(API_URL);
      setWishlist(response.data);
    } catch (error) {
      setError('Une erreur s\'est produite lors du chargement de la wishlist.');
    }
  };

  const handleAddFilm = async () => {
    if (newFilm.trim() === '') {
      setError('Veuillez entrer le nom du film.');
      return;
    }

    try {
      const info = await getFilmInfo(newFilm);
      const response = await axios.post(API_URL, {
        title: info.title,
        image: info.image,
        description: info.description,
      });
      setWishlist([...wishlist, response.data]);
      setNewFilm('');
      setError('');
    } catch (error) {
      setError('Une erreur s\'est produite lors de l\'ajout du film.');
    }
  };

  const handleRemoveFilm = async (filmId) => {
    try {
      await axios.delete(`${API_URL}/${filmId}`);
      setWishlist((prevWishlist) => prevWishlist.filter((film) => film.id !== filmId));
    } catch (error) {
      setError('Une erreur s\'est produite lors de la suppression du film.');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div>
      <div className='addFilms'>
        <input
          type="text"
          value={newFilm}
          onChange={(e) => setNewFilm(e.target.value)}
          placeholder="Nom du film"
        />
        <button onClick={handleAddFilm}><span>Ajouter à la Wishlist</span></button>
      </div>
      <h2 className='titreAccroche'>Que faites vous quand vous voulez regarder un film plus tard car vous n’avez pas le temps ? Vous le noter pas vrai ? Alors laissez moi vous présenter la Wishlist.
          Grâce à cette liste vous pourrez entrer le nom du film que vous voudrez voir, mais ça ne va pas seulement retenir le nom mais aussi l’image avec la description comme ça vous gagnez du temps !</h2>
      {error && <p>{error}</p>}
      <div className="wishlist-container">
        {wishlist.length === 0 ? (
          <p>Votre wishlist est vide pour le moment.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Image</th>
                <th>Description</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((film) => (
                <tr key={film.id}>
                  <td>{film.title}</td>
                  <td>
                    <img src={film.image} alt={film.title} width="150" />
                  </td>
                  <td className="centered-description">
                    {film.description}
                  </td>
                  <td>
                    <button onClick={() => handleRemoveFilm(film.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
