import React from 'react'

import Gallery from './Gallery'
import About from './About'
import Contact from './Contact'

const Home = () => {
  return (
    <div className="home-background">
      <div className="main-background">
      </div>
      <div className="home-content-div">
        <div className="home-route-content">
          <Gallery />
          <About />
          <Contact />
        </div>
      </div>
    </div>
  )
}

export default Home
