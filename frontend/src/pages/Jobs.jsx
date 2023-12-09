import React, {useState, useEffect} from 'react'
import CommonSection from '../shared/CommonSection';

import "../styles/job.css";

import JobCard from './../shared/JobCard';
import SearchBar from './../shared/SearchBar';
import Newsletter from './../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';

import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';


const Jobs = () => {
  const [pageCount, setPageCount] = useState(0);
  const[page, setPage] = useState(0);
  const {data:jobs, loading, error} = useFetch(`${BASE_URL}/jobs?page=${page}`)

  const {data:jobCount} = useFetch(`${BASE_URL}/jobs/search/getJobCount`)

  useEffect(() =>{
    const pages = Math.ceil(jobCount  / 8);
    setPageCount(pages);
    window.scrollTo(0,0)


  }, [page, jobCount, jobs]
  );


  // console.log(jobs);
  
  return (
    <>
      <CommonSection title = {"All Jobs"}/> 
      <section>
        <Container>
          <Row>
            <SearchBar />
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
            jobs?.map(job=> (
            <Col lg='3' md='6' sm='6' className = "mb-4" key ={job._id}>
         
              <JobCard job = {job}/>
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

export default Jobs

