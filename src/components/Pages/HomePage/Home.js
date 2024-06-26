import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../../MovieList/MovieList";

const Home = () => {
  const [populerMovieData, setPopulerMovieData] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      );
      console.log(data)
      setPopulerMovieData(data.data.results);
    })();
  }, []);
  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          transitionTime={4}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
        >
          {populerMovieData.map((movie) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.id}
                ></img>
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">{movie.original_title}</div>
                <div>
                  {movie.release_date}
                  <span className="posterImage__rating">
                    {movie.vote_average}
                    <i className="fas fa-star" />
                  </span>
                </div>
                <div className="posterImage__description">{movie.overview}</div>
              </div>
            </Link>
          ))}
        </Carousel>
        <MovieList />
      </div>
    </>
  );
};

export default Home;
