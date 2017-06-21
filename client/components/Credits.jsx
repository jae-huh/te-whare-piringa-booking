import React from 'react'

const Credits = () => {
  return (
    <section className='credits-container section-container'>
      <div className='section-inner-div credits-inner-div'>
        <div className='credits'>
          <h2 className='credits-heading'>Made with <span className="glyphicon glyphicon-heart credits-icon" aria-hidden="true"> </span> by...</h2>
          <div className="credits-name-list">
            <h3>Paul Brabet <a href='https://github.com/paul-brabet'><img className="github-icon" src="/images/GitHub-Mark-Light-64px.png" /></a></h3>
            <h3>Jack Daffron <a href='https://github.com/daffron'><img className="github-icon" src="/images/GitHub-Mark-Light-64px.png" /></a></h3>
            <h3>Luke Davison <a href='https://github.com/luke-davison'><img className="github-icon" src="/images/GitHub-Mark-Light-64px.png" /></a></h3>
            <h3>Jae Huh <a href='https://github.com/Jae-Huh'><img className="github-icon" src="/images/GitHub-Mark-Light-64px.png" /></a></h3>
          </div>
          <h2 className="credits-description">as part of Enspiral Dev Academy final project.</h2>
        </div>
      </div>
    </section>
  )
}

export default Credits
