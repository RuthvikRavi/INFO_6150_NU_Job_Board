import React, {useState} from 'react';

import CommonSection from './../shared/CommonSection';
import {Container, Row, Col} from 'reactstrap';

import {useLocation} from "react-router-dom";
import ApplicationCard from './../shared/ApplicationCard';
import Newsletter from './../shared/Newsletter';

const SearchResultList = () => {

  const location = useLocation()

  const [data] = useState(location.state)

  return <>
  <CommonSection title={'Application Search Result'} />
  <section>
    <Container>
      <Row>
        {
          data.length === 0 ? (<h4 className="text-center">No Applications Found</h4> )
          :( data?.map(application=>(
          <Col lg='3' className="mb-4" key={application._id}> 
          
            <ApplicationCard application={application}/> 
          </Col>))
        )}
      </Row>
    </Container>
  </section>
  <Newsletter />
  </>
   
  
};

export default SearchResultList