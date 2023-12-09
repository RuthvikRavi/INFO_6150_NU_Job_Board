import React from 'react';
import '../styles/about.css'
import aditya from '../assets/images/aditya.jpeg'
import ameya from '../assets/images/ameya.jpeg'
import ruthvik from '../assets/images/ruthvik.jpeg'
import neha from '../assets/images/neha.jpeg'

const About = () => {
  return (
    <div className="container mt-3">
      <h1 className='mb-3'>About Us</h1>
      <p>
      Welcome to NU Job Board, the premier platform connecting Northeastern University's
      talented students with exciting career opportunities. At NU Job Board, we believe 
      in empowering students to explore, apply, and succeed in their professional journeys.
      </p>
      <p>
      Our mission is to bridge the gap between academic excellence and professional success 
      by providing a seamless and user-friendly job search experience. We strive to connect
      Northeastern University students with a diverse range of job opportunities that align
      with their skills, interests, and career goals.
      </p>
      <p>
      Northeastern University, a leading institution for experiential learning, is at the 
      heart of our platform. We are proud to be affiliated with Northeastern's commitment 
      to fostering innovation, collaboration, and real-world experiences that prepare students
      for the challenges of today's dynamic job market.
      </p>

      <h3 className='mt-5 mb-1'>Our Team</h3>
      <div className="row mt-3">
        <div className="col-md-3 mb-4">
          <div className="card mr-4">
            <img
              className="card-img-top"
              src= {aditya}
              alt="team member"
            />
            <div className="card-body">
              <h5 className="card-title">Aditya Sawant</h5>
              {/* <p className="card-text">Student</p> */}
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card mr-4">
            <img
              className="card-img-top"
              src={ameya}
              alt="team member"
            />
            <div className="card-body">
              <h5 className="card-title">Ameya Apte</h5>
              {/* <p className="card-text">Student</p> */}
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <img
              className="card-img-top"
              src={ruthvik}
              alt="team member"
            />
            <div className="card-body">
              <h5 className="card-title">Ruthvik Ravi</h5>
              {/* <p className="card-text">Student</p> */}
            </div>
          </div>
        </div>
  
        <div className="col-md-3 mb-4">
          <div className="card mr-4">
            <img
              className="card-img-top"
              src={neha}
              alt="team member"
            />
            <div className="card-body">
              <h5 className="card-title">Neha Balaji</h5>
            </div>
          </div>
        </div>
    </div>
  </div>
);
};

export default About;
