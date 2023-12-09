import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Jobs from '../pages/Jobs'
import JobDetails from '../pages/JobDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SearchResultList from '../pages/SearchResultList'
import ThankYou from '../pages/ThankYou'
import About from '../pages/About'
import Testimonial from '../components/Testimonial/Testimonials'
import Courses from '../pages/Courses'
import SearchCourseResultList from '../pages/SearchCourseResultList'
import SearchSubscriptionResultList from '../pages/SearchSubscriptionResultList'
import SearchApplicationResultList from '../pages/SearchApplicationResultList'
import Subscriptions from '../pages/Subscriptions'
import Applications from '../pages/Applications'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element = {<Navigate to='/home' />}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/subscription' element={<Subscriptions/>} />
        <Route path='/application' element={<Applications/>} />
        <Route path='/jobs' element={<Jobs/>} />
        <Route path='/jobs/:id' element={<JobDetails/>} />   
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/thank-you' element={<ThankYou/>} />
        <Route path='/jobs/search' element={<SearchResultList/>} />
        <Route path='/about' element={<About />} />
        <Route path ='/testimonial' element={<Testimonial/>  }/>
        <Route path='/courses' element={<Courses/>} />
        <Route path='/courses/search' element={<SearchCourseResultList/>} />
        <Route path='/subscription/search' element={<SearchSubscriptionResultList/>} />
        <Route path='/application/search' element={<SearchApplicationResultList/>} />

    </Routes>
  )
}

export default Routers