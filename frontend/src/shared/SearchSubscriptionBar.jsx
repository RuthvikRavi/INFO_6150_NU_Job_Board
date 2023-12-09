import React,{useRef} from 'react'
import './search-bar.css'
import {Col,Form,FormGroup} from 'reactstrap'
import {BASE_URL} from './../utils/config';
import {useNavigate} from 'react-router-dom';

const SearchSubscriptionBar = () => {

    const navigate = useNavigate();

    const receiptRef =  useRef('');

    const searchHandler = async()=>{
        const receipt = receiptRef.current.value

        if(receipt===''){
            alert("Receipt number is mandatory")
            return;
        }

        const res = await fetch(`${BASE_URL}/subscription/search/getSubscriptionBySearch?receipt=${receipt}`)

        if(res.success) alert ('Something went wrong');

        const result = await res.json();

        navigate(`/subscription/search?receipt=${receipt}`, {state: result.data})
   };


  return <Col lg='12'>
    <div className="search__bar">
        <Form className='d-flex align-items-center gap-4'>
            <FormGroup className='d-flex  gap-3 form__group form__group-fast mt-3' >
                <span><i className="ri-map-pin-line"></i></span>
                <div>
                    <h6>Receipt No</h6>
                    <input type="text" placeholder='Enter Receipt No' ref={receiptRef} required/> 
                </div>
            </FormGroup>
            
            <span className="search__icon" type='submit' onClick={searchHandler}>
                <i className="ri-search-line"></i>
            </span>
        </Form>
    </div>
  </Col>

  
}

export default SearchSubscriptionBar