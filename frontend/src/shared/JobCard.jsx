
import React, { useState, useContext } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Form,FormGroup, Button} from 'reactstrap';
import {AuthContext} from '../context/AuthContext';
import './job-card.css';
import Modal from 'react-modal';
import { BASE_URL } from "../utils/config";
const JobCard = ({ job }) => {

  const { _id, title, city, address, desc, companySize, photo, salary, featured, applications } = job;

  const [isModalOpen, setModalOpen] = useState(false);
  const {user} = useContext(AuthContext);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [newCourse, setNewJob] = useState({
    title: job.title,
    desc: job.desc,
    price: job.salary,
    city: job.city,
    duration: 0,
    subscriptions: [],
    featured: job.featured,
  });

  const handleChange = e => {
    setNewJob(prev=>({...prev, [e.target.id]:e.target.value}));
  }; 

  const handleClick = async e =>{
  
    try {
        
        job.fullName = user.username;
        job.amountPaid = salary;
  
        const res = await fetch(`${BASE_URL}/subscription/${job._id}`,{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify(job)
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
  
    const handleUpdateClick = async e =>{
      
      e.preventDefault();
  
          try {
  
              const res = await fetch(`${BASE_URL}/jobs/${job._id}`,{
                  method:'put',
                  headers:{
                      'content-type':'application/json'
                  },
                  credentials:'include',
                  body:JSON.stringify(newCourse)
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
  
  const handleDeleteClick = async e =>{
    e.preventDefault();
  
        try {  
  
            const res = await fetch(`${BASE_URL}/jobs/${job._id}`,{
                method:'delete',
                headers:{
                    'content-type':'application/json'
                },
                credentials:'include',
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

  return <div className='job__card'>
    <Card>
      <div className='job__img'>
        <img src={photo} alt='' />
        <p></p>
        {featured && <span style={{zIndex:"0"}}><i className="ri-star-fill" style={{zIndex:"0"}}></i></span>}
      </div>


      <CardBody>

        <h5 className="job__title"><Link to={`/jobs/${_id}`}>{title}</Link></h5>

        <div className="card__top d-flex align-items-center justify-content-between">
          <span className="job location d-flex align-items-center gap-1">
            <i className="ri-map-pin-line"></i> {city}
          </span>
          <span className=" d-flex align-items-center gap-1">
            <i className="ri-star-fill"></i>
            {applications.length === 0 ? (
              "New"
            ) : (
              <span> ({applications.length}) </ span>
            )}
          </span>
        </div>

        <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
          <h5>${salary}<span>/hr</span></h5>

          <div>
          {user && user.role==="admin"?(<>
          <span type='submit' className="search__icon" onClick={handleOpenModal}>
          <i className="ri-edit-line"></i>
          </span>
          </>):""}
          
          {user && user.role==="admin"?(<Modal
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
                        <input type="text" placeholder="Full Name" id="title" defaultValue={title} onChange={handleChange} required/>
                    </FormGroup>
                    <h5>Address</h5>
                    <FormGroup>
                    <textarea
                        placeholder="Address"
                        id="address"
                        required
                        onChange={handleChange}
                        defaultValue={address}
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
                        defaultValue={desc}
                        // defaultValue={user ? user.email : ''}
                    ></textarea>
                    </FormGroup>
                    <h5>City</h5>
                    <FormGroup>
                        <input type="text" placeholder='City' id="city" onChange={handleChange} defaultValue={city} required/>
                    </FormGroup>
<h5>Salary</h5>
                    <FormGroup>
                        <input type="number" placeholder='$' id="salary" onChange={handleChange} defaultValue={salary} required/>
                    </FormGroup>
        <h5>Featured</h5>
                <FormGroup>
                    <select
                        id="featured"
                        required
                        onChange={handleChange}
                        defaultValue={featured}
                    >
                        <option value="" disabled>Select an option</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    </FormGroup>
                    <h5>Company Size</h5>
                <FormGroup>
                    <select
                        id="companySize"
                        required
                        defaultValue={companySize}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select an option</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                    </FormGroup>
                </div>

                
                </Form>

                <Button className="btn booking__btn" style={{marginRight:"1em", marginTop:"1em"}} onClick={handleUpdateClick} >Update</Button>
                <Button className="btn booking__btn" style={{marginRight:"1em", marginTop:"1em"}} onClick={handleDeleteClick} >Delete</Button>
                <button className="btn booking__btn" style={{marginRight:"1em", marginTop:"1em"}} onClick={handleCloseModal}>Close</button>
                </div>
            </Modal>):''}
            </div>  
          <button className="btn booking__btn"><Link to={`/jobs/${_id}`}>Learn More</Link></button>
          
              
        </div>
      </CardBody>
    </Card>


  </div>
};

export default JobCard;