import React from 'react';
import { Offcanvas } from 'react-bootstrap';

const TermsAndConditionsOffcanvas = ({ show, handleClose }) => {
  
  return (
    <Offcanvas show={show} onHide={handleClose}>
      
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>NU Jobs - Terms & Conditions</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body>
        {/* Add your Terms and Conditions text here */}
        <p>By using NU Jobs, you agree to our Terms & Conditions. You must
          provide accurate information when creating an account. We may suspend
          or terminate accounts for violations. Job listings and content must be
          accurate, lawful, and respectful. We don't endorse or guarantee job
          listings or candidates. Privacy is important; see our Privacy Policy.
          Prohibited activities include illegal actions, harassment, or harming
          our site. We don't provide warranties and aren't liable for damages.
          We can terminate or suspend accounts. These terms are governed by
          Massuchussets. If you have questions, contact us at [Contact
          Information]. Please review these terms periodically for updates.</p>
      </Offcanvas.Body>

    </Offcanvas>
  );
};

export default TermsAndConditionsOffcanvas;
