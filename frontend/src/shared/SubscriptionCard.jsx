
import React, { useState } from 'react';
import { Card } from 'reactstrap';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";

const SubscriptionCard = ({ subscription }) => {

  const [isModalOpen, setModalOpen] = useState(false);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();

  const handleDeleteClick = async e =>{
    e.preventDefault();

      try {
          // console.log(newSubscription);

          const res = await fetch(`${BASE_URL}/subscription/${subscription._id}`,{
              method:'delete',
              headers:{
                  'content-type':'application/json'
              },
              credentials:'include',
              // body:JSON.stringify(newSubscription)
          });
          const result = await res.json()

          if(!res.ok){
              return alert(result.message);
          }
          navigate('/thank-you');
      } catch (err) {
          alert(err.message);
      }
  }

  return <div className='subscription__card'>
    <Card>
      <div>
                  <p className="course__title" style={{fontSize:"100%", textAlign:"center", padding:"1%"}} onClick={handleOpenModal}>
                    Receipt No <br></br> <b>{subscription._id}</b>
                  </p>
                  <Modal
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
                    }}
                  >
                    <div style={{zIndex:"1"}}>
                      
                      <h2>Receipt No: {subscription._id}</h2>
                      <br></br>
                      <p>Subscriber Name: {subscription.fullName}</p>
                      <p>Subscriber Email: {subscription.userEmail}</p>
                      <p>Subscriber UserID: {subscription.userId}</p>
                      <br></br>
                      <p>Course Name: {subscription.courseName}</p>
                      <p>Amount Paid: {subscription.amountPaid}</p>
                      <p>Bought on: {new Date(subscription.createdAt).toLocaleDateString('en-US', options)}</p>
                      <br></br>
                      <br></br>
                      <button className="btn booking__btn" style={{marginRight:"1em"}} onClick={handleDeleteClick}>Delete</button>
                      <button className="btn booking__btn" style={{marginRight:"1em"}} onClick={handleCloseModal}>Close</button>
                    </div>
                  </Modal>
                </div>
    </Card>


  </div>
};

export default SubscriptionCard;