import React, {useState} from 'react';

import CommonSection from './../shared/CommonSection';
import {Container, Row, Col} from 'reactstrap';

import {useLocation} from "react-router-dom";
import JobCard from './../shared/JobCard';
import Newsletter from './../shared/Newsletter';

const SearchResultList = () => {

  const location = useLocation()

  const [data] = useState(location.state)

  return <>
  <CommonSection title={'Job Search Result'} />
  <section>
    <Container>
      <Row>
        {
          data.length ===0 ? (<h4 className="text-center">No Jobs Found</h4> )
          :( data?.map(job=>(
          <Col lg='3' className="mb-4" key={job._id}> 
          
            <JobCard job={job}/> 
          </Col>))
        )}
      </Row>
    </Container>
  </section>
  <Newsletter />
  </>
   
  
};

export default SearchResultList