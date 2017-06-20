import React from 'react'

const Gallery = () => {
  return (
    <section className='gallery-container section-container' id='gallery'>
      <div className='section-inner-div'>
        <h1 className='home-headings'>Gallery</h1>
        <div className='gallery'>
          <div className='gallery-image-container'>
            <img className='gallery-single-image' src='/images/front.png' />
          </div>
          <div className='gallery-image-container'>
            <img className='gallery-single-image' src='/images/kitchen1.jpg' />
          </div>
          <div className='gallery-image-container'>
            <img className='gallery-single-image' src='/images/inside.jpg' />
          </div>
          <div className='gallery-image-container'>
            <img className='gallery-single-image' src='/images/kitchen2.jpg' />
          </div>
          <div className='gallery-image-container'>
            <img className='gallery-single-image' src='/images/deck1.jpg' />
          </div>
          <div className='gallery-image-container'>
            <img className='gallery-single-image' src='/images/deck2.jpg' />
          </div>
          <div className='gallery-image-container gallery-logo'>
            <img className='gallery-single-image' src='/images/logo.png' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
