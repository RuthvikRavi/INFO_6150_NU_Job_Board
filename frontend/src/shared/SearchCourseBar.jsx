import React,{useRef, useState, useContext} from 'react'
import './search-bar.css'
import {Col,Form,FormGroup, Button} from 'reactstrap'
import {BASE_URL} from './../utils/config';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import { AuthContext } from '../context/AuthContext'

const SearchCourseBar = () => {

    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    const descRef =  useRef('')
    const priceRef =  useRef(0)

    const [isModalOpen, setModalOpen] = useState(false);
    
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const searchHandler = async()=>{
        const desc = descRef.current.value
        const price = priceRef.current.value

        if(desc==='' || price===''){
            alert("All fields are mandatory")
            return;
        }

        if(price < 1 || price > 100){
            alert("Price should be between 1 and 100");
            return;
        }
    
        const res = await fetch(`${BASE_URL}/courses/search/getCourseBySearch?desc=${desc}&price=${price}`)

        if(!res.ok) alert ('Something went wrong');

        const result = await res.json();

        navigate(`/courses/search?desc=${desc}&price=${price}`, {state: result.data})
   };

   const [newCourse, setNewCourse] = useState({
        title: '',
        desc: '',
        price: '',
        duration: '',
        subscriptions: [],
        featured: '',
    });

    const handleChange = e => {
        setNewCourse(prev=>({...prev, [e.target.id]:e.target.value}));
    }; 

    const handleClick = async e=>{
        e.preventDefault();

        try {
            newCourse.duration = `${selectedHour}hr ${selectedMinute}mins`;

            const res = await fetch(`${BASE_URL}/courses`,{
                method:'post',
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

    const [selectedHour, setSelectedHour] = useState('00');
    const [selectedMinute, setSelectedMinute] = useState('00');

    const handleHourChange = (event) => {
        setSelectedHour(event.target.value);
    };

    const handleMinuteChange = (event) => {
        setSelectedMinute(event.target.value);
    };

  return <Col lg='12'>
    <div className="search__bar">
        <Form className='d-flex align-items-center gap-4'>
            <FormGroup className='d-flex  gap-3 form__group form__group-fast mt-3' >
                <span><i className="ri-map-pin-line"></i></span>
                <div>
                    <h6>Keywords</h6>
                    <input type="text" placeholder='Course elements' ref={descRef} required/> 
                </div>
            </FormGroup>
            <FormGroup className='d-flex  gap-3 form__group form__group-fast mt-3' >
                <span><i className="ri-map-pin-time-line"></i></span>
                <div>
                    <h6>Maximum Price</h6>
                    <input type="number" placeholder='$/hr' ref={priceRef}  required/>
                </div>
            </FormGroup>
            
            <span className="search__icon" type='submit' onClick={searchHandler}>
                <i className="ri-search-line"></i>
            </span>

            <div>
            {user && user.role==="admin"?(<>
                <span type='submit' className="search__icon" onClick={handleOpenModal}>
                <i className="ri-add-line"></i>
            </span>
            </>):""}
            
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
                <h3 style={{color:"black"}}>Add new course</h3>

                <Form onSubmit={handleClick}>
                <div>
                    <h5 className="personal__info">Title</h5>
                    <FormGroup>
                        <input type="text" placeholder="Full Name" id="title" onChange={handleChange} required/>
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
<h5>Price</h5>
                    <FormGroup>
                        <input type="number" placeholder='$' id="price" onChange={handleChange}  required/>
                    </FormGroup>
        <h5>Duration</h5>
        <div style={{marginBottom:"1em", marginTop:"1em"}}>
            <select value={selectedHour} onChange={handleHourChange}>
                {Array.from({ length: 24 }, (_, i) => i.toString()).map((hour) => (
                <option key={hour} value={hour}>
                    {hour}
                </option>
                ))}
            </select> <b>hr : </b><select value={selectedMinute} onChange={handleMinuteChange}>
                {Array.from({ length: 60 }, (_, i) => i.toString()).map((minute) => (
                <option key={minute} value={minute}>
                    {minute}
                </option>
                ))}
            </select> <b>mins</b>
        </div>

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
                <button className="btn booking__btn" style={{marginRight:"1em", marginTop:"1em"}} onClick={handleCloseModal}>Close</button>
                </div>
            </Modal>
            </div>

        </Form>
    </div>
  </Col>

  
}

export default SearchCourseBar