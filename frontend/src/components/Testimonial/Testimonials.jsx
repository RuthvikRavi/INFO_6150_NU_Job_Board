

import React from 'react'

const Testimonials = () => {
  return (

    <div className="container testimonial my-5">
      <div id="carouselExample" className="carousel slide py-5">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-flex flex-wrap flex-row align-items-center justify-content-evenly">
              <img
                src="/headshot1.jpg"
                alt=""
                className="rounded-circle object-fit-cover"
              />

              <div className="d-flex flex-column">
                <h3 className="fw-bold">John Doe</h3>
                <p className="fw-light">Northeastern University</p>
                <p className="text-wrap fw-medium" style={{ width: '20rem' }}>
                  "This platform made job hunting easier. User-friendly
                  interface, personalized recommendations, and timely
                  notifications. Landed my dream job within weeks!"
                </p>
              </div>

            </div>
          </div>

          <div className="carousel-item">
            <div className="d-flex flex-wrap flex-row align-items-center justify-content-evenly">
              <img
                src="/headshot2.jpg"
                alt=""
                className="rounded-circle object-fit-cover"
              />
              
              <div className="d-flex flex-column">
                <h3 className="fw-bold">James M</h3>
                <p className="fw-light">Northeastern University</p>
                <p className="text-wrap fw-medium" style={{ width: '20rem' }}>
                  "Impressive job listings, real-time alerts. Supportive
                  community and insightful content. Switched industries and
                  found my dream job."
                </p>
              </div>

            </div>
          </div>

          <div className="carousel-item">
            <div className="d-flex flex-wrap flex-row align-items-center justify-content-evenly">
              <img
                src="/headshot3.jpg"
                alt=""
                className="rounded-circle object-fit-cover"
              />

              <div className="d-flex flex-column">
                <h3 className="fw-bold">Sarah jane</h3>
                <p className="fw-light">Northeastern University</p>
                <p className="text-wrap fw-medium" style={{ width: '20rem' }}>
                  "Simplified my job search. Advanced search, company insights,
                  easy application tracking. Landed a fantastic entry-level
                  position. Highly recommend!"
                </p>
              </div>

            </div>
          </div>
        </div>

        <button 
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        
      </div>
    </div>
      
  )
}

export default Testimonials