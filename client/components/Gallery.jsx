import React from 'react'

const Gallery = () => {
  return (
    <section className='gallery-container section-container' id='gallery'>
      <div className='section-inner-div'>
        <h1 className='home-headings'>Gallery</h1>
        <div className='gallery'>
          {/* image 1 */}
          <div className='gallery-image-container'>
            <a href="#front">
              <img className='gallery-single-image' src='/images/front.png' />
            </a>
          </div>
          <a href="#_" className="lightbox" id="front">
            <img src='/images/front.png' />
          </a>
          {/* image 2 */}
          <div className='gallery-image-container'>
            <a href="#kitchen1">
              <img className='gallery-single-image' src='/images/kitchen1.jpg' />
            </a>
          </div>
          <a href="#_" className="lightbox" id="kitchen1">
            <img src='/images/kitchen1.jpg' />
          </a>
          {/* image 3 */}
          <div className='gallery-image-container'>
            <a href="#inside">
              <img className='gallery-single-image' src='/images/inside.jpg' />
            </a>
          </div>
          <a href="#_" className="lightbox" id="inside">
            <img src='/images/inside.jpg' />
          </a>
          {/* image 4 */}
          <div className='gallery-image-container'>
            <a href="#kitchen2">
              <img className='gallery-single-image' src='/images/kitchen2.jpg' />
            </a>
          </div>
          <a href="#_" className="lightbox" id="kitchen2">
            <img src='/images/kitchen2.jpg' />
          </a>
          {/* image 5 */}
          <div className='gallery-image-container'>
            <a href="#deck1">
              <img className='gallery-single-image' src='/images/deck1.jpg' />
            </a>
          </div>
          <a href="#_" className="lightbox" id="deck1">
            <img src='/images/deck1.jpg' />
          </a>
          {/* image 6 */}
          <div className='gallery-image-container'>
            <a href="#deck2">
              <img className='gallery-single-image' src='/images/deck2.jpg' />
            </a>
          </div>
          <a href="#_" className="lightbox" id="deck2">
            <img src='/images/deck2.jpg' />
          </a>
          {/* image 7 */}
          <div className='gallery-image-container gallery-logo'>
            <a href="#logo">
              <img className='gallery-single-image' src='/images/logo.png' />
            </a>
          </div>
          <a href="#_" className="lightbox" id="logo">
            <img src='/images/logo.png' />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Gallery
//
// <a href="#img1">
//   <img src="http://insomnia.rest/images/screens/main.png" class="thumbnail" />
// </a>
//
// <!-- lightbox container hidden with CSS -->
// <a href="#_" class="lightbox" id="img1">
//   <img src="http://insomnia.rest/images/screens/main.png" />
// </a>
//
// .lightbox {
// 	/** Default lightbox to hidden */
// 	display: none;
//
// 	/** Position and style */
// 	position: fixed;
// 	z-index: 999;
// 	width: 100%;
// 	height: 100%;
// 	text-align: center;
// 	top: 0;
// 	left: 0;
// 	background: rgba(0,0,0,0.8);
// }
//
// .lightbox img {
// 	/** Pad the lightbox image */
// 	max-width: 90%;
// 	max-height: 80%;
// 	margin-top: 2%;
// }
//
// .lightbox:target {
// 	/** Remove default browser outline */
// 	outline: none;
//
// 	/** Unhide lightbox **/
// 	display: block;
// }
