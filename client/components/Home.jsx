import React from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import Hall from './Hall'
import Gallery from './Gallery'
import About from './About'
import Contact from './Contact'
import Credits from './Credits'

class Home extends React.Component {
  componentDidMount () {
    // Decode entities in the URL
    // Sometimes a URL like #/foo#bar will be encoded as #/foo%23bar
    window.location.hash = window.decodeURIComponent(window.location.hash)
    const scrollToAnchor = () => {
      const hashParts = window.location.hash.split('#')
      if (hashParts.length > 2) {
        const hash = hashParts.slice(-1)[0]
        document.querySelector(`#${hash}`).scrollIntoView()
      }
    }
    scrollToAnchor()
    window.onhashchange = scrollToAnchor
  }
  render () {
    return (
      <div className="home-background">
        <div className="main-background">
          <div className="home-button-box">
            <h1>Te Whare Piringa</h1>
            <h2>Our Place</h2>
            <p>"Tamaki, the most thriving, engaged, and dynamic community"</p>
            <Link to="/calendar" className="home-book-link"><div className="home-book-button">Book Now</div></Link>
          </div>
        </div>
        <div className="home-content-div">
          <div className="home-route-content">
            <Hall />
            <Gallery />
            <About />
            <Contact />
            <Credits />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
