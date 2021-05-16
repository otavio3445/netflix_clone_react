import { API_KEY, API_URL } from './vars'

const fillItems = async (endpoint) => {
  const req = await fetch(`${API_URL}${endpoint}`);
  const json = await req.json();
  return json;
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais da Netflix',
        items: await fillItems('/discover/tv?with_network=213&language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'trending',
        title: 'Recomendados para Você',
        items: await fillItems('/trending/all/week?language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'topRated',
        title: 'Em Alta',
        items: await fillItems('/movie/top_rated?language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await fillItems('/discover/movie?with_genres=28&language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await fillItems('/discover/movie?with_genres=35&language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'horror',
        title: 'Horror',
        items: await fillItems('/discover/movie?with_genres=27&language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await fillItems('/discover/movie?with_genres=10749&language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await fillItems('/discover/movie?with_genres=99&language=pt-BR&api_key='+API_KEY)
      },
    ];
  },

  getMovieInfo: async (movieId, type) => {
    let info = {};
    
    if (movieId) {
      switch (type) {
        case 'movie':
          info = await fillItems(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
          break;
          
        case 'tv':
          info = await fillItems(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
          break;
        default:
          info = null;
          break;
      }
    }
    
    return info;
  }
}