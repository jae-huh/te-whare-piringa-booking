import React from 'react'

const Credits = () => {
  return (
    <section className='credits-container section-container'>
      <div className='section-inner-div credits-inner-div'>
        <div className='credits'>
          <h2 className='credits-heading'>Made with <span className="glyphicon glyphicon-heart credits-icon" aria-hidden="true"> </span> by...</h2>
          <div className="credits-name-list">
            <a href='https://github.com/paul-brabet' target='_blank'><h3>Paul Brabet <img className="github-icon" src="/images/GitHub-Mark-Light-64px.png" /></h3></a>
            <a href='https://github.com/daffron' target='_blank'><h3>Jack Daffron <img className="github-icon" src="/images/GitHub-Mark-Light-64px.png" /></h3></a>
            <a href='https://github.com/luke-davison' target='_blank'><h3>Luke Davison <img className="github-icon" src="/images/GitHub-Mark-Light-64px.png" /></h3></a>
            <a href='https://github.com/Jae-Huh' target='_blank'><h3>Jae Huh <img className="github-icon" src="/images/GitHub-Mark-Light-64px.png" /></h3></a>
          </div>
          <h2 className="credits-description">as part of Enspiral Dev Academy final project.</h2>
        </div>
      </div>
    </section>
  )
}

export default Credits
