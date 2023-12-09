import React, { useState } from 'react'
import './newsletter.css'
import {BASE_URL} from './../utils/config';
import { Container, Row, Col} from 'reactstrap'
import jobNews from '../assets/images/8.svg'

const Newsletter = () => {

  const [receiverEmail,setReceiverEmail] = useState('');  
  
  const sendEmail = async () => {
    const url = `${BASE_URL}/sendEmail`;

    const emailData = {
      "to":receiverEmail,
      "subject":'Welcome to NU Jobs Newsletter!',
      "text":'Stay updated through weekly news regarding the jobs around!!!',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert('Successfully subscribed to newsletter.');
        setReceiverEmail('');
      } else {
        // console.error('Failed to send email:', await response.text());
      }
    } catch (error) {
      // console.error('Error sending email:', error);
    }
  };

  return <section className="newsletter">
    <Container>
        <Row>
            <Col lg='6'>
                <div className="newsletter__content">
                <h2>Subscribe to Our Job Alerts!</h2>

                    <div className="newsletter__input">
                        <input type="email" placeholder='Enter your email'  value={receiverEmail} onChange={(e)=>setReceiverEmail(e.target.value)} />
                        <button className="btn newsletter__btn" id='email' onClick={sendEmail}>Subscribe</button>
                    </div>

                    <p>
                Stay informed about the latest job opportunities and career
                insights by subscribing to our newsletter.
              </p>
                </div>
            </Col>
            <Col lg="6">
                <div className="newsletter__img">
                    <img src={jobNews} alt="" />
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default Newsletter