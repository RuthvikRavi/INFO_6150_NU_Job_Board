import React, {useContext} from 'react';
import './Home.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const {user} = useContext(AuthContext);
  
  return (
    <>
      <div className="container text-center mt-3">
        <div className="row justify-content-center align-items-center">
          
          <div className="col-md-6">
            <img
              src="/img_banner.jpg"
              alt="Banner"
              className="img-fluid w-75 mx-auto d-block rounded"
            />
          </div>

          <div className="col-md-6">
            
            <h1 className="display-1 mt-3">Find your next job!</h1>
            
            <h1 className="display-5 mb-5">
              Find and become a professional with passion
            </h1>
            
            {user?(<>
              <Link to="/jobs" className="btn btn-dark btn-lg">
            Apply Now
            </Link>
            </>):(<>
              <Link to="/login" className="btn btn-dark btn-lg">
            Apply Now
            </Link>
            </>)}

          </div>
        </div>
      </div>

      <div className="container">
        
        <div className="d-flex flex-row flex-wrap align-items-center justify-content-between mt-5">
          <img className="client-icon" src="/android.png" alt="Android" />
          <img className="client-icon" src="/fitbit.png" alt="Fitbit" />
          <img className="client-icon" src="/flutter.png" alt="Flutter" />
          <img className="client-icon" src="/google.png" alt="Google" />
          <img className="client-icon" src="/tensorflow.png" alt="TensorFlow" />
        </div>
        
        <div className="content d-flex flex-row flex-wrap justify-content-center">
          <div className="w-50">
            
            <h1 className="display-3 mb-5">
              <span className="highlight">One</span> platform <br />
              <span className="highlight">Multiple</span> opportunities
            </h1>
            
            <p className="mb-5" style={{width:"80%"}}>
              Explore our platform for outstanding job opportunities with top-tier
              clients. Your dream job is just a click away. Join us today!
            </p>
            
            <button
              type="button"
              className="btn btn-dark"
              data-bs-toggle="collapse"
              data-bs-target="#createProfileCollapse"
            >
              Create Profile
            </button>
            
            <div style={{ minHeight: '120px', marginTop: '10px' }}>
              <div className="collapse collapse-horizontal" id="createProfileCollapse">
                <div className="card card-body" style={{ width: '300px' }}>
                  Start your journey. Showcase skills, connect, and grow
                  professionally. Sign up now. Your gateway to
                  opportunities.
                </div>
              </div>
            </div>

          </div>

          <img
            width="40%"
            className="img-fluid ml-5 mt-5 client-img"
            src="/clients.jpg"
            alt="Clients"
          />

        </div>
      </div>
      
      <h1 className="text-center display-3 my-5">
        Hired with
        <span className="highlight"> NU Jobs </span>
      </h1>
      
      <div className="container">
        <div className="d-flex align-items-center justify-content-evenly flex-wrap">
          
          <div className="card my-3" style={{ width: '18rem', height: '10rem'}}>
            <div className="card-body">
              <h5 className="card-title">High Job Placement Rate</h5>
              <p className="card-text">
                80% success in matching job seekers with their dream companies
              </p>
            </div>
          </div>
          
          <div className="card my-3" style={{ width: '18rem', height: '10rem' }}>
            <div className="card-body">
              <h5 className="card-title">Large User Base</h5>
              <p className="card-text">
                Millions of registered users, fostering a thriving job community
                and expanding opportunities.
              </p>
            </div>
          </div>
          
          <div className="card my-3" style={{ width: '18rem', height: '10rem' }}>
            <div className="card-body">
              <h5 className="card-title">Reduced Time-to-Fill for Employers</h5>
              <p className="card-text">
                Cut hiring time from 45 to 30 days, enhancing efficiency, and
                minimizing costs.
              </p>
            </div>
          </div>
          
        </div>
      </div>
      
      <h1 className="text-center display-3 my-5">FAQ</h1>
      
      <div className="accordion pb-5 px-5" id="faqAccordian">
        <div className="accordion-item">
          
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              1. How do I create an account on your job board?
            </button>
          </h2>
          
          <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#faqAccordian">
            <div className="accordion-body">
              To create an account, simply click on the "Sign Up" or "Register"
              button on the homepage. You'll be prompted to provide your email
              address, create a password, and fill in some basic information about
              yourself. Once you've completed these steps, your account will be
              ready for use.
            </div>
          </div>
        </div>
      
        <div className="accordion-item">
          
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              2. Can I post job listings on your website as an employer?
            </button>
          </h2>
          
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordian">
            <div className="accordion-body">
              Absolutely! If you're an employer looking to post job listings, you
              can sign up as an employer on our platform. After creating your
              account, you'll have the option to post job openings, manage
              applications, and connect with potential candidates. We offer
              various pricing plans for employers, so you can choose the one that
              best suits your needs.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              3. How can I search for jobs that match my skills and preferences?
            </button>
          </h2>
          
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordian"
          >
            <div className="accordion-body">
              We've made it easy for job seekers to find the right opportunities.
              Simply use our search feature to input keywords, job titles, or
              locations. You can also use filters to refine your search by
              industry, experience level, and more. Additionally, you can set up
              job alerts to receive notifications when new positions that match
              your criteria become available. Finding your dream job has never
              been easier!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;