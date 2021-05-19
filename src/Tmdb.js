const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

const fillItems = async (url, endpoint) => {
  const req = await fetch(`${url}${endpoint}`);
  const json = await req.json();
  return json;
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getHomeList: async () => {
    let res = await fetch(`${baseURL}/get-api-vars`);
    let resObj = await res.json();
    let API_KEY = await resObj.API_KEY;
    let url = await resObj.API_URL;
    return [
      {
        slug: 'originals',
        title: 'Originais da Netflix',
        items: await fillItems(url, '/discover/tv?with_network=213&language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'trending',
        title: 'Recomendados para Você',
        items: await fillItems(url, '/trending/all/week?language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'topRated',
        title: 'Em Alta',
        items: await fillItems(url, '/movie/top_rated?language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await fillItems(url, '/discover/movie?with_genres=28&language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await fillItems(url, '/discover/movie?with_genres=35&language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'horror',
        title: 'Horror',
        items: await fillItems(url, '/discover/movie?with_genres=27&language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await fillItems(url, '/discover/movie?with_genres=10749&language=pt-BR&api_key='+API_KEY)
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await fillItems(url, '/discover/movie?with_genres=99&language=pt-BR&api_key='+API_KEY)
      },
    ];
  },

  getMovieInfo: async (movieId, type) => {
    let res = await fetch(`${baseURL}/get-api-vars`);
    let resObj = await res.json();
    let API_KEY = await resObj.API_KEY;
    let url = await resObj.API_URL;

    let info = {};
    if (movieId) {
      switch (type) {
        case 'movie':
          info = await fillItems(url, `/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
          break;
          
          case 'tv':
            info = await fillItems(url, `/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
            break;
            default:
              info = null;
              break;
            }
          }
          
    return info;
  }
}