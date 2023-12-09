import React,{useRef, useContext, useState} from 'react'
import './search-bar.css'
import {Col,Form,FormGroup, Button} from 'reactstrap'
import {BASE_URL} from './../utils/config';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Modal from 'react-modal';

const SearchBar = () => {

   const locationRef =  useRef('')
   const salaryRef =  useRef(0)
   const companySizeRef =  useRef(0)
   const navigate = useNavigate()
   const {user} = useContext(AuthContext)

   const [isModalOpen, setModalOpen] = useState(false);
    
   

   const searchHandler = async()=>{
    const location = locationRef.current.value
    const salary = salaryRef.current.value
    const companySize = companySizeRef.current.value

    if(location==='' || salary==='' || companySize==='' ){
        alert("All fields are mandatory")
        return;
    }

    if(salary < 1 || salary > 100){
        alert("Salary should be between 1 and 100");
        return;
    }
    const res = await fetch(`${BASE_URL}/jobs/search/getJobBySearch?city=${location}&salary=${salary}&companySize=${companySize}`)

    if(!res.ok) alert ('Something went wrong')

    const result = await res.json()

    navigate(`/jobs/search?city=${location}&salary=${salary}&companySize=${companySize}`, {state: result.data})


   };

   const handleOpenModal = () => {
    setModalOpen(true);
};

const handleCloseModal = () => {
    window.location.reload();
};


   const [newJob, setNewJob] = useState({
    title: '',
    city: '',
    salary: 0,
    featured: '',
    applications: [],
    companySize: '',
    desc:'',
    address:'',
});

const handleChange = e => {
    setNewJob(prev=>({...prev, [e.target.id]:e.target.value}));
}; 

const handleClick = async e=>{
    e.preventDefault();

    try {

        const res = await fetch(`${BASE_URL}/jobs`,{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify(newJob)
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

  return <Col lg='12'>
    <div className="search__bar">
        <Form className='d-flex align-items-center gap-4'>
            <FormGroup className='d-flex  gap-3 form__group form__group-fast mt-3' >
                <span><i className="ri-map-pin-line"></i></span>
                <div>
                    <h6>Location</h6>
                    <input type="text" placeholder='Job Posting Location' ref={locationRef} required/> 
                </div>
            </FormGroup>
            <FormGroup className='d-flex  gap-3 form__group form__group-fast mt-3' >
                <span><i className="ri-map-pin-time-line" style={{color:"--heading-color"}}></i></span>
                <div>
                    <h6>Maximum Salary</h6>
                    <input type="number" placeholder='Compensation $/hr' ref={salaryRef}  required/>
                </div>
            </FormGroup>
            <FormGroup className='d-flex  gap-3 form__group form__group-last mt-3' >
                <span><i className="ri-group-line"></i></span>
                <div>
                    <h6>Company Size</h6>
                    <select ref={companySizeRef} defaultValue="" style={{border:"none", fontSize:"80%", fontWeight:"600", color:"grey"}} required>
                        <option value="" disabled>Select Company Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>

            </FormGroup>
            <span className="search__icon" type='submit' onClick={searchHandler}>
                <i className="ri-search-line"></i>
            </span>
            <div>
                {user && user.role==="admin"?(<>
                <span type='submit' className="search__icon" onClick={handleOpenModal}>
                <i className="ri-add-line"></i>
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
                <h3 style={{color:"black"}}>Add new job</h3>

                <Form onSubmit={handleClick}>
                <div>
                    <h5 className="personal__info">Title</h5>
                    <FormGroup>
                        <input type="text" placeholder="Job" id="title" onChange={handleChange} required/>
                    </FormGroup>
                    <h5 className="personal__info">City</h5>
                    <FormGroup>
                        <input type="text" placeholder="City" id="city" onChange={handleChange} required/>
                    </FormGroup>
                    <h5>Address</h5>
                    <FormGroup>
                    <textarea
                        placeholder="Address"
                        id="address"
                        required
                        onChange={handleChange}
                        // defaultValue={user ? user.email : ''}
                    ></textarea>
                    </FormGroup>
                    <h5>Description</h5>
                    <FormGroup>
                    <textarea
                        placeholder="Description Here"
                        id="desc"
                        required
                        onChange={handleChange}
                        // defaultValue={user ? user.email : ''}
                    ></textarea>
                    </FormGroup>
                    <h5>Salary</h5>
                    <FormGroup>
                        <input type="number" placeholder='$' id="salary" onChange={handleChange}  required/>
                    </FormGroup>

                    {/* <h5>Applications</h5>
                    <FormGroup>
                        <input type="number" value='0' id="appNum" onChange={handleChange}/>
                    </FormGroup> */}
        
                    <h5>Company Size</h5>
                <FormGroup>
                    <select
                        id="companySize"
                        required
                        onChange={handleChange}
                        defaultValue=""
                    >
                        <option value="" disabled>Select an option</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                    </FormGroup>
        <h5>Featured</h5>
                <FormGroup>
                    <select
                        id="featured"
                        required
                        onChange={handleChange}
                        defaultValue=""
                    >
                        <option value="" disabled>Select an option</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    </FormGroup>
                </div>

                
                </Form>

                <Button className="btn booking__btn" style={{marginRight:"1em", marginTop:"1em"}} onClick={handleClick} >Add</Button>
                <Button className="btn booking__btn" style={{marginRight:"1em", marginTop:"1em"}} onClick={handleCloseModal}>Close</Button>
                </div>
            </Modal>

            </span>
            </>):""}
            </div>
        </Form>
    </div>
  </Col>
}

export default SearchBar