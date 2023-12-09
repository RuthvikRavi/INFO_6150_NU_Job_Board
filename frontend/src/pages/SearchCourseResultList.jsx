import React, {useState} from 'react';

import CommonSection from './../shared/CommonSection';
import {Container, Row, Col} from 'reactstrap';

import {useLocation} from "react-router-dom";
import CourseCard from './../shared/CourseCard';
import Newsletter from './../shared/Newsletter';

const SearchResultList = () => {

  const location = useLocation()

  const [data] = useState(location.state)

  return <>
  <CommonSection title={'Course Search Result'} />
  <section>
    <Container>
      <Row>
        {
          data.length ===0 ? (<h4 className="text-center">No Courses Found</h4> )
          :( data?.map(course=>(
          <Col lg='3' className="mb-4" key={course._id}> 
          
            <CourseCard course={course}/> 
          </Col>))
        )}
      </Row>
    </Container>
  </section>
  <Newsletter />
  </>
   
  
};

export default SearchResultList