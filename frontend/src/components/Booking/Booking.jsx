import React,{useState, useContext} from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

import './booking.css'

const today = new Date();
const minDate = today.toISOString().slice(0, 10);

const Booking = ({ job }) => {

    const { title} = job;
    const {user} = useContext(AuthContext);

    const [responseReceived, setResponseReceived] = useState(false);

    


    const searchHandler = async()=>{

        const res = await fetch(`${BASE_URL}/application/search/getAppBySearch?userId=${user._id}&jobName=${title}`);

        const response = await res.json();
        
        // Check if the request was successful (status code 2xx)
        if (response.success) {
            setResponseReceived(true);
        } else {
            setResponseReceived(false);
        }
    }

    user && searchHandler();

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email ,
        jobName: title,
        fullName: '',
        phone: '',
        dateOfAvailability:'',
        expectedSalary: '',
    });


    const [receiverEmail,setReceiverEmail] = useState('');  
  
    const sendEmail = async () => {
        const url = `${BASE_URL}/sendEmail`;

        const emailData = {
        "to": booking.userEmail,
        "subject":"Thanks for Applying to Job Id" + job._id ,
        "text":'You have successfully applied to ' + booking.jobName,
        };

        try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });

        if (response.ok) {
            alert('Thanks for applying you will receive an email shortly!');
            setReceiverEmail('');
        } else {
            // console.error('Failed to send email:', await response.text());
        }
        } catch (error) {
        // console.error('Error sending email:', error);
        }
    };

    const handleChange = e => {
        setBooking(prev=>({...prev, [e.target.id]:e.target.value}));
    }; 
      
    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    }

    const validateDate = (date) => {
        const today = new Date();
        const selectedDate = new Date(date);
        return selectedDate > today;
    }

    const validateGuestSize = (expectedSalary) => {
        return expectedSalary >= 1 && expectedSalary <= 100;
    }

    const handleClick = async e=>{
        e.preventDefault();

        try {
            if(!user || user === undefined || user === null){
                return alert("Please sign in ");
            }

            if (!validatePhone(booking.phone)) {
                return alert("Phone number should be valid and have 10 digits");
            }

            if (!validateDate(booking.dateOfAvailability)) {
                return alert("Please select a valid date");
            }

            if (!validateGuestSize(booking.expectedSalary)) {
                return alert("Expected salary should be between 1 and 100");
            }

            booking.fullName = user.username;

            const res = await fetch(`${BASE_URL}/application/${job._id}`,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify(booking)
            });
            const result = await res.json()

            if(!res.ok){
                return alert(result.message);
            }else{
                sendEmail();
            }
    
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    }


return (
    <div className="bookings">
        
        <div className="booking__form">
            <h4 className="app__info mt-3 mb-4">Application Information</h4>
            
            <Form className="booking__info-form" onSubmit={handleClick}>
                <div>
                    
                    <h5 className="personal__info">Personal Information</h5>
                    
                    <FormGroup>
                        <input type="text" placeholder="Full Name" id="fullName" defaultValue={user ? user.username : ''}
                        required readOnly
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <input
                            type="email"
                            placeholder="Email Address"
                            id="email"
                            required
                            readOnly
                            defaultValue={user ? user.email : ''}
                        />
                    </FormGroup>
                    
                    {!responseReceived && <FormGroup>
                        <input 
                            type="tel" 
                            placeholder ="Contact Number" 
                            id="phone" 
                            minLength="10" 
                            maxLength="10" 
                            required 
                            onChange={handleChange}
                            />
                    </FormGroup>}
                </div>
                
                {!responseReceived && 
                    <div>
                        <h5 className="personal__info">Availability</h5>
                        
                        <FormGroup className="d-flex align-items-center gap-3">
                            <input type="date" placeholder="" id="dateOfAvailability" required onChange={handleChange} min={minDate}/>
                        </FormGroup>
                    </div>
                }

                {!responseReceived && 
                    <div>
                        <h5 className="personal__info">Expected Salary</h5>
                    
                        <FormGroup className="d-flex align-items-center gap-3">
                            <input type="number" placeholder="$ per hour" id="expectedSalary" required onChange={handleChange} min="1" max="1000"/>
                        </FormGroup>
                    </div>
                }

            </Form>
        </div>
        
        <div className="booking__bottom">
            <Button className="btn primary__btn w-100 mt-4" style={{backgroundColor:"black !important"}} onClick={handleClick} disabled={responseReceived}>{responseReceived ? 'Already Applied' : 'Apply'}</Button>
        </div>

    </div>
);
}

export default Booking;
