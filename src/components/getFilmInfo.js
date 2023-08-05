import axios from 'axios';

const apiKey = 'e50e0414e23c745e53930789db2b83e4'; // <-- la clé de l'api que j'ai récup en m'inscrivant

const getFilmInfo = async (filmName) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: apiKey,
        language: 'fr', 
        query: filmName,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      const filmData = response.data.results[0];
      return {
        title: filmData.title,
        image: `https://image.tmdb.org/t/p/w500/${filmData.poster_path}`,
        description: filmData.overview,
      };
    } else {
      throw new Error('Film introuvable. Veuillez entrer un nom valide.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du film :', error);
    throw new Error('Une erreur s\'est produite lors de la recherche du film.');
  }
};

export default getFilmInfo;
