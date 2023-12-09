// footer.jsx
import React, {useState} from 'react';
import './Footer.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import TermsAndConditionsOffcanvas from '../Offcanvas/TermsAndConditionsOffcanvas.jsx';
const Footer = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasShow = () => setShowOffcanvas(true);
  const handleOffcanvasClose = () => setShowOffcanvas(false);
  return (
    <footer className="container-fluid p-1 temp">
      <div className="row text-center mt-3" >
        <div className="col text-align-left">
          <h4>Product</h4>
          <p>FAQ</p>
          <p>For Candidates</p>
          <p>For Employers</p>
          <p>Login</p>
        </div>
        <div className="col">
          <h4>Company</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Services</p>
        </div>
        <div className="col">
          <h4>Social</h4>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>Facebook</p>
        </div>
        <div className="col">
          <h4>Resources</h4>
          <p>Privacy Policy</p>
          {/* <button
            className="btn"
            style={{ color: 'white', marginTop: '-10px', marginBottom: '5px' }}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            T & C
          </button> */}
              <Button variant="link" onClick={handleOffcanvasShow} style={{ color: 'white', marginTop: '-10px', marginBottom: '5px', textDecoration: 'none' }}>
            T & C
          </Button>

          {/* Offcanvas component */}
          <TermsAndConditionsOffcanvas
            show={showOffcanvas}
            handleClose={handleOffcanvasClose}
          />
          <p>Contact Us</p>
        </div>
      </div>
      <p className="text-center mt-2">&copy; 2023 NU-Jobs All rights reserved</p>
    </footer>
  );
};

export default Footer;
