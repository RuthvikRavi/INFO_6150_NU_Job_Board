import React, {useState} from 'react';

import CommonSection from './../shared/CommonSection';
import {Container, Row, Col} from 'reactstrap';

import {useLocation} from "react-router-dom";
import SubscriptionCard from './../shared/SubscriptionCard';
import Newsletter from './../shared/Newsletter';

const SearchResultList = () => {

  const location = useLocation()

  const [data] = useState(location.state)

  return <>
  <CommonSection title={'Subscription Search Result'} />
  <section>
    <Container>
      <Row>
        {
          data.length === 0 ? (<h4 className="text-center">No Subscriptions Found</h4> )
          :( data?.map(subscription=>(
          <Col lg='3' className="mb-4" key={subscription._id}> 
          
            <SubscriptionCard subscription={subscription}/> 
          </Col>))
        )}
      </Row>
    </Container>
  </section>
  <Newsletter />
  </>
   
  
};

export default SearchResultList