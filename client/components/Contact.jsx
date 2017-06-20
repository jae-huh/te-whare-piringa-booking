import React from 'react'

import Maps from './Maps'

const Contact = () => {
  return (
    <section className='contact-container section-container' id='contact'>
      <div className='section-inner-div'>
        <h1 className='home-headings'>Contact Us</h1>
        <div className='contact'>
          <Maps />
          <div className="contact-information">
            <h2>Address</h2>
            <p>(Old Scout Hall)</p>
            <p>29 Fenchurch St, Glen Innes, Auckland 1072</p>
            <h2>Phone</h2>
            <p>09-528 3411</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
