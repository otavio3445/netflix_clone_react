import React, {
  useEffect,
  useState
} from 'react';
import './App.scss';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';
import Header from './components/Header/Header';

const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setTimeout(()=> setMovieList(list), 1500)
      
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => { window.removeEventListener('scroll', scrollListener) }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {
        featuredData && <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((movie, index) => (
          <MovieRow key={index} title={movie.title} items={movie.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por otavio3445<br />
        Direitos de imagem para Netflix<br />
        Dados pegos em Themoviedb.org
      </footer>

      {
        movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="spinner loading" />
        </div>
      }

    </div>
  );
}

export default App;
