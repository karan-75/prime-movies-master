import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./style.scss"
import useFetch from '../../../hooks/useFetch';
import img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import Img from '../../../components/lazyLoadImage/Img';

const HomeBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => { return state.home });
  const { data, loading } = useFetch("/movie/upcoming");


  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setInterval(() => {
      const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
      if (bg) {
        setBackground(bg);
      }
    },10000);
    if (bg) {
      setBackground(bg);
    }
  }, [data]);


  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }

  }

  return (
    <div className="homeBanner">
      {!loading && <div className="backdrop-img">
        <div className="pic"><Img src={background} /></div>
      </div>}
      <div>
        <div className="homeBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">Millions of Movies, TV shows and people to discover. Explore now.</span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a Movie and TV Show...." onChange={(event) => setQuery(event.target.value)} onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomeBanner;