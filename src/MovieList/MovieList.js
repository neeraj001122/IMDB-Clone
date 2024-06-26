import './MovieList.css'
import { useEffect, useState } from 'react';
import Cards from '../components/Card';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieList = () => {
    const [movieListData, setMovieListData] = useState([])
    const {type} = useParams();

   useEffect(() => {
     getData();
   },[])   

   useEffect(() => {
    getData();
  },[type])

  const getData = async() =>{
        const data = await axios.get(
          `https://api.themoviedb.org/3/movie/${type ? type:'popular'}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        );
        setMovieListData(data.data.results)
  };

  return (
    <div className="movie__list">
        <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
        <div className="list__cards">
            {
                movieListData.map(movie => (
                    <Cards movie={movie} />
                ))
            }
        </div>
    </div>
)

};

export default MovieList ;