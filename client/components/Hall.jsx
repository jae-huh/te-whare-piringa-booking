import React from 'react'

const Hall = () => {
  return (
    <section className='hall-container section-container' id='hall'>
      <div className='section-inner-div'>
        <h1 className='home-headings'>Our Hall</h1>
        <div className='hall'>
          <div className='hall-info'>
            <h2 className='hall-info-heading'>What we offer</h2>
            <ul>
              <li>A reasonably sized hall that has two internal areas (one main hall and one small hall)</li>
              <li>Open plan outdoor deck</li>
              <li>Open space at the rear of the premises</li>
              <li>10 tables available with hire</li>
              <li>100 chairs available with hire</li>
              <li>Kitchenette with microwave, oven and fridge</li>
              <li>Capacity: 100 people</li>
              <li>Free Wi-Fi access</li>
              <li>Three toilets including one accessible toilet</li>
              <li>Accessible entrance</li>
            </ul>
          </div>
          <div className='hall-info'>
            <h2 className='hall-info-heading'>What happens at Te Whare Piringa?</h2>
            <ul>
              <li><a href='https://www.aucklandchamber.co.nz/business-support/find-staff/employment-programmes/career-start/' target='_blank'>Career Start</a> - youth employment programme</li>
              <li><a href='http://www.communicare.org.nz/friendship-centres/' target='_blank'>Communicare</a> - for the elderlies</li>
              <li>Regular community meetings</li>
              <li>Religious groups</li>
              <li>Food drop off service</li>
              <li>Private functions</li>
              <li>Central meeting point for our Safer Neighbourhood Programme</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hall
