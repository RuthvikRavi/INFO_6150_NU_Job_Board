
import React, { useState , useContext } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Form,FormGroup, Button} from 'reactstrap'
import StripeCheckout from 'react-stripe-checkout';
import {AuthContext} from '../context/AuthContext'
import Modal from 'react-modal';
import { BASE_URL } from "../utils/config";

import './course-card.css';

const CourseCard = ({ course }) => {

  const [isModalOpen, setModalOpen] = useState(false);

  const {user} = useContext(AuthContext)

  const { title, duration, photo, price, featured, desc, subscriptions } = course;
  
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [newCourse, setNewCourse] = useState({
    title: course.title,
    desc: course.desc,
    price: course.price,
    duration: course.duration,
    subscriptions: [],
    featured: course.featured,
  });

  const handleChange = e => {
    setNewCourse(prev=>({...prev, [e.target.id]:e.target.value}));
  }; 

  const [selectedHour, setSelectedHour] = useState(parseInt(duration.match(/(\d+)h/)[1], 10));
  const [selectedMinute, setSelectedMinute] = useState(parseInt(duration.match(/(\d+)mins/)[1], 10));

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
};

const handleMinuteChange = (event) => {
    setSelectedMinute(event.target.value);
};

  const [responseReceived, setResponseReceived] = useState(false);

  const searchHandler = async()=>{

    const res = await fetch(`${BASE_URL}/subscription/search/getAppBySearch?userId=${user._id}&courseName=${title}`);

    const response = await res.json();

    if (response.success) {
        setResponseReceived(true);
    } else {
        setResponseReceived(false);
    }
}

searchHandler();

  const handleToken = (token) => {
    // make API call to your server to process payment
    fetch('/charge', {
      method: 'POST',
      body: JSON.stringify(token)
    })
    .then(response => {
      handleClick();
    })
    .catch(error => {
      handleClick();
    });
  }


  //test

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email ,
    courseName: title,
    fullName: '',
    amountPaid: '',
});

const [receiverEmail,setReceiverEmail] = useState('');  
  
    const sendEmail = async () => {
        const url = `${BASE_URL}/sendEmail`;

        const emailData = {
        "to": booking.userEmail,
        "subject":"Thanks for Purchasing Course Id" + course._id ,
        "text":'You have successfully purchased the ' + booking.courseName,
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
            alert('Thanks for purchasing you will receive an email shortly!');
            setReceiverEmail('');
        } else {
            // console.error('Failed to send email:', await response.text());
        }
        } catch (error) {
        // console.error('Error sending email:', error);
        }
    };

const handleClick = async e =>{

  try {
      
      booking.fullName = user.username;
      booking.amountPaid = price;

      const res = await fetch(`${BASE_URL}/subscription/${course._id}`,{
          method:'post',
          headers:{
              'content-type':'application/json'
          },
          credentials:'include',
          body:JSON.stringify(booking)
      });
      const result = await res.json()

      if(!res.ok){
          return alert(result.message);
      }
      // else{
      //   sendEmail();
      // }
      window.location.reload();

  } catch (err) {
      alert(err.message);
  }
  
}

  const handleUpdateClick = async e =>{

    e.preventDefault();

        try {
            newCourse.duration = `${selectedHour}hr ${selectedMinute}mins`;

            const res = await fetch(`${BASE_URL}/courses/${course._id}`,{
                method:'put',
                headers:{
                    'content-type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify(newCourse)
            });
            const result = await res.json()

            if(!res.ok){
                return alert(result.message);
            }
            window.location.reload();

        } catch (err) {
            alert(err.message);
        }
}

const handleDeleteClick = async e =>{
  e.preventDefault();

      try {
          newCourse.duration = `${selectedHour}hr ${selectedMinute}mins`;

          const res = await fetch(`${BASE_URL}/courses/${course._id}`,{
              method:'delete',
              headers:{
                  'content-type':'application/json'
              },
              credentials:'include',
          });
          const result = await res.json()

          if(!res.ok){
              return alert(result.message);
          }
          window.location.reload();
      } catch (err) {
          alert(err.message);
      }
}

  return <div className='course__card'>
    <Card>
      <div className='course__img'>
        <img src={photo} alt='' />
        <p></p>
        {featured && <span style={{zIndex:"0"}}><i className="ri-star-fill"></i></span>}
      </div>


      <CardBody>
      <div>
      <h5 className="course__title" onClick={handleOpenModal}>
        {title}
      </h5>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex:"0"
          },
          content: {
            width: '80%', // Default width
            height: '80%', // Default height
            overflow: 'auto',
            padding: '5%'
          },
        }}
      >
        <div style={{zIndex:"0"}}>
          <h2>{title} {featured && <i className="ri-star-fill"></i>}</h2>
          <br></br>
          <h4>Description</h4>
          <p dangerouslySetInnerHTML={{ __html: desc }} />
          <br></br>
          <h4>Price</h4>
          <h5>${price}</h5>
          <br></br>
          <br></br>
          
          <p>
            <strong>Disclaimer:</strong> The courses featured on this website are provided for informational purposes only. Our website does not endorse or guarantee the content, quality, or effectiveness of any course listed. The decision to enroll in a course is at the sole discretion of the user. Users are encouraged to conduct their own research and consider their individual needs and goals before making any educational choices.
          </p>
          <button className="btn booking__btn" onClick={handleCloseModal}>Close</button>
        </div>
      </Modal>
    </div>

        <div className="card__top d-flex align-items-center justify-content-between">
          <span className="course location d-flex align-items-center gap-1">
            <i className="ri-time-line"></i> {duration}
          </span>
          <span className=" d-flex align-items-center gap-1">
            <i className="ri-star-fill" style={{zIndex:"0"}}></i>
            {subscriptions.length === 0 ? (
              "New"
            ) : (
              <span> ({subscriptions.length}) </ span>
            )}
          </span>
        </div>

        <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
          <h5>${price}</h5>

          <div>
          {user && user.role==="admin"?(<>
          <span type='submit' className="search__icon" onClick={handleOpenModal}>
          <i className="ri-edit-line"></i>
          </span>
          </>):""}
          
          {user && user.role==="admin"?(<Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Example Modal"
                style={{
                overlay: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                },
                content: {
                    width: '80%', // Default width
                    height: '80%', // Default height
                    overflow: 'auto',
                    padding: '5%'
                },
                zIndex:"1",
                }}
            >
                <div style={{zIndex:"10"}}>
                {/* Content of your modal goes here */}
                <h3 style={{color:"black"}}>Update course</h3>

                <Form onSubmit={handleClick}>
                <div>
                    <h5 className="personal__info">Title</h5>
                    <FormGroup>
                        <input type="text" placeholder="Full Name" id="title" defaultValue={title} onChange={handleChange} required/>
                    </FormGroup>
                    <h5>Description</h5>
                    <FormGroup>
                    <textarea
                        placeholder="Description Here"
                        id="desc"
                        required
                        onChange={handleChange}
                        defaultValue={desc}
                        // defaultValue={user ? user.email : ''}
                    ></textarea>
                    </FormGroup>
<h5>Price</h5>
                    <FormGroup>
                        <input type="number" placeholder='$' id="price" onChange={handleChange} defaultValue={price} required/>
                    </FormGroup>
        <h5>Duration</h5>
        <div style={{marginBottom:"1em", marginTop:"1em"}}>
            <select onChange={handleHourChange} defaultValue={parseInt(duration.match(/(\d+)h/)[1], 10)}>
                {Array.from({ length: 24 }, (_, i) => i.toString()).map((hour) => (
                <option key={hour} value={hour}>
                    {hour}
                </option>
                ))}
            </select> <b>hr : </b><select defaultValue={parseInt(duration.match(/(\d+)mins/)[1], 10)} onChange={handleMinuteChange}>
                {Array.from({ length: 60 }, (_, i) => i.toString()).map((minute) => (
                <option key={minute} value={minute}>
                    {minute}
                </option>
                ))}
            </select> <b>mins</b>
        </div>

        <h5>Featured</h5>
                <FormGroup>
                    <select
                        id="featured"
                        required
                        onChange={handleChange}
                        defaultValue={featured}
                    >
                        <option value="" disabled>Select an option</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    </FormGroup>
                </div>

                
                </Form>

                <Button className="btn booking__btn" style={{marginRight:"1em", marginTop:"1em"}} onClick={handleUpdateClick} >Update</Button>
                <Button className="btn booking__btn" style={{marginRight:"1em", marginTop:"1em"}} onClick={handleDeleteClick} >Delete</Button>
                <button className="btn booking__btn" style={{marginRight:"1em", marginTop:"1em"}} onClick={handleCloseModal}>Close</button>
                </div>
            </Modal>):''}
            </div>


          {user ? (<StripeCheckout
            token={handleToken}
            stripeKey='pk_test_51OI01MDYkCfoF8bhQR7QWuekJQRtS2Kh8B64EJUaEG4itlIPtbvgRwAD5FL8CbPtRay5IvBe4YeAoeItVpm8ITbb00zwCRoFgv'
            amount={price * 100} // amount in cents
            currency='USD'
            name='Tour Booking'
            billingAddress
            shippingAddress
            disabled={responseReceived}
          >
            <button className="btn booking__btn" disabled={responseReceived}>{responseReceived ? 'Bought':'Buy Now'}</button>
          </StripeCheckout>) : (<button className="btn booking__btn"><Link to={`/login`}>Buy Now</Link></button>) }
         </div>
      </CardBody>
    </Card>


  </div>
};

export default CourseCard;