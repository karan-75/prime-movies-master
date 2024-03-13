import React from 'react';
import "./style.scss"
import HomeBanner from "./homeBanner/HomeBanner"
import Trending from './trending/Trending';
import Pupular from './popular/Popular';
import TopRated from './topRated/TopRated';



const Home = () => {
  return (<>
    <HomeBanner />
    
    
    <div className="homePage" >
    <div className="opecity-layer"></div>
      <Trending />
      <Pupular />
      <TopRated />
    </div>
  </>
  )
}

export default Home