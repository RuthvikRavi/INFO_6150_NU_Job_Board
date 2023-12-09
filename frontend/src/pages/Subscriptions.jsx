import React, {useState, useEffect} from 'react'
import CommonSection from '../shared/CommonSection';

import SubscriptionCard from '../shared/SubscriptionCard';
import SearchSubscriptionBar from '../shared/SearchSubscriptionBar';
import Newsletter from '../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';

import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';

import Modal from 'react-modal';

const Subscriptions = () => {
  const [pageCount, setPageCount] = useState(0);
  const[page, setPage] = useState(0);
  const {data:subscriptions, loading, error} = useFetch(`${BASE_URL}/subscription?page=${page}`)

  const {data:subscriptionCount} = useFetch(`${BASE_URL}/subscription/search/getSubscriptionCount`)

  useEffect(() =>{
    const pages = Math.ceil(subscriptionCount  / 8);
    setPageCount(pages);
    window.scrollTo(0,0)


  }, [page, subscriptionCount, subscriptions]
  );

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (subscription) => {
    renderModal(subscription);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const renderModal = (subscription) => {
      return (
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
                      {/* Content of your modal goes here */}
                      <h2>Receipt No: {subscription._id}</h2>
                      <br></br>
                      <p>Subscriber Name: {subscription.fullName}</p>
                      <p>Subscriber Email: {subscription.userEmail}</p>
                      <p>Subscriber UserID: {subscription.userId}</p>
                      <br></br>
                      <p>Course Name: {subscription.courseName}</p>
                      <p>Amount Paid: {subscription.amountPaid}</p>
                      <p>Bought on: {subscription.createdAt}</p>
                      <br></br>
                      <br></br>
                      <button className="btn booking__btn" onClick={handleCloseModal}>Close</button>
                    </div>
                  </Modal>
      );
  };
  
  return (
    <>
      <CommonSection title = {"All Subscriptions"}/> 
      <section>
        <Container>
          <Row>
            <SearchSubscriptionBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading........ </h4>}
          {error && <h4 className="text-center pt-5">{error} </h4>}


         {
          !loading && !error &&  <Row>
          {
            subscriptions?.map(subscription=> (
            <Col lg='3' md='6' sm='6' className = "mb-4" key ={subscription._id} >
                <SubscriptionCard subscription = {subscription}/>
                {/* <div>
                  <p className="course__title" style={{fontSize:"150%", textAlign:"center"}} onClick={handleOpenModal}>
                    Receipt No <br></br> <b>{subscription._id}</b>
                  </p> */}
                  {/* <Modal
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
                      <p>Bought on: {subscription.createdAt}</p>
                      <br></br>
                      <br></br>
                      <button className="btn booking__btn" onClick={handleCloseModal}>Close</button>
                    </div>
                  </Modal> */}
                {/* </div> */}
            </Col>
            ))
          }
          <Col lg= '12'>
          <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
          {[...Array(pageCount).keys()].map(number =>(
            <span key = {number} onClick={()=> setPage(number)}
            className={page === number ? "active__page": " "}
            
            >
              {number + 1}  
            </span>
          ))}
          </div>
          </Col>

        </Row>
         }
        </Container>
      </section>
      <Newsletter />
    </>
    
  );
};

export default Subscriptions

