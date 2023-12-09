import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import { Container, Row, Col } from 'reactstrap';

import CommonSection from '../shared/CommonSection';
import ApplicationCard from '../shared/ApplicationCard';
import SearchApplicationBar from '../shared/SearchApplicationBar';
import Newsletter from '../shared/Newsletter';

import useFetch from '../hooks/useFetch';

import { BASE_URL } from '../utils/config';

const Applications = () => {

  const [pageCount, setPageCount] = useState(0);
  const[page, setPage] = useState(0);
  const {data:applications, loading, error} = useFetch(`${BASE_URL}/application?page=${page}`)

  const {data:applicationCount} = useFetch(`${BASE_URL}/application/search/getApplicationCount`)

  useEffect(() =>{
      const pages = Math.ceil(applicationCount  / 8);
      setPageCount(pages);
      window.scrollTo(0,0)

    }, [page, applicationCount, applications]
  );

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (application) => {
    renderModal(application);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const renderModal = (application) => {
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
                      <h2>Receipt No: {application._id}</h2>
                      <br></br>
                      <p>Subscriber Name: {application.fullName}</p>
                      <p>Subscriber Email: {application.userEmail}</p>
                      <p>Subscriber UserID: {application.userId}</p>
                      <br></br>
                      <p>Course Name: {application.courseName}</p>
                      <p>Amount Paid: {application.amountPaid}</p>
                      <p>Bought on: {application.createdAt}</p>
                      <br></br>
                      <br></br>
                      <button className="btn booking__btn" onClick={handleCloseModal}>Close</button>
                    </div>
                  </Modal>
      );
  };
  
  return (
    <>
      <CommonSection title = {"All Applications"}/> 
      <section>
        <Container>
          <Row>
            <SearchApplicationBar />
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
            applications?.map(application=> (
            <Col lg='3' md='6' sm='6' className = "mb-4" key ={application._id} >
                <ApplicationCard application = {application}/>
                {/* <div>
                  <p className="course__title" style={{fontSize:"150%", textAlign:"center"}} onClick={handleOpenModal}>
                    Receipt No <br></br> <b>{application._id}</b>
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
                      
                      <h2>Receipt No: {application._id}</h2>
                      <br></br>
                      <p>Subscriber Name: {application.fullName}</p>
                      <p>Subscriber Email: {application.userEmail}</p>
                      <p>Subscriber UserID: {application.userId}</p>
                      <br></br>
                      <p>Course Name: {application.courseName}</p>
                      <p>Amount Paid: {application.amountPaid}</p>
                      <p>Bought on: {application.createdAt}</p>
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

export default Applications

