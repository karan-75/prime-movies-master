import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from "./Rd_store/homeSlice"

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import searchResult from "./pages/searchResult/SearchResult";
import explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import { BsAmd } from 'react-icons/bs';

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home)


  useEffect(() => {
    fetchApiConfig();
    genresCall();

  }, []);


  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {


      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promiese = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};


    endPoints.forEach((url) => {
      promiese.push(fetchDataFromApi(`/genre/${url}/list`))
    });

    const data = await Promise.all(promiese);
    data?.map(({ genres }) => {
      return genres?.map((item) => (allGenres[item?.id] = item))
    });

    dispatch(getGenres(allGenres));

  };



  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>)
}

export default App
