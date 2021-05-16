import React, {
  useEffect,
  useState
} from 'react';
import './App.scss';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';

const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  },[])

  return (
    <div className="page">
      {
        featuredData && <FeaturedMovie item={featuredData}/>
      }
      <section className="lists">
        {movieList.map((movie, index) => (
            <MovieRow key={index} title={movie.title} items={movie.items}/>
        ))}
      </section>
    </div>
  );
}

export default App;
