import React, {useState, useEffect} from 'react'
import CommonSection from '../shared/CommonSection';

import "../styles/course.css";

import CourseCard from '../shared/CourseCard';
import SearchCourseBar from '../shared/SearchCourseBar';
import Newsletter from '../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';

import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';


const Courses = () => {
  const [pageCount, setPageCount] = useState(0);
  const[page, setPage] = useState(0);
  const {data:courses, loading, error} = useFetch(`${BASE_URL}/courses?page=${page}`)

  const {data:courseCount} = useFetch(`${BASE_URL}/courses/search/getCourseCount`)

  useEffect(() =>{
    const pages = Math.ceil(courseCount  / 8);
    setPageCount(pages);
    window.scrollTo(0,0)


  }, [page, courseCount, courses]
  );


  // console.log(courses);
  
  return (
    <>
      <CommonSection title = {"All Courses"}/> 
      <section>
        <Container>
          <Row>
            <SearchCourseBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading........ </h4>}
          {error && <h4 className="text-center pt-5">{error} </h4>}


         {
          !loading && !error &&  <Row>
          {
            courses?.map(course=> (
            <Col lg='3' md='6' sm='6' className = "mb-4" key ={course._id}>
         
              <CourseCard course = {course}/>
            </Col>
            ))
          }
          <Col lg= '12'>
          <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
          {[...Array(pageCount).keys()].map(number =>(
            <span key = {number} onClick={()=> setPage(number)}
            className={page === number ? "active__page": " "}
            
            >
              {number + 1}  
            </span>
          ))}
          </div>
          </Col>

        </Row>
         }
        </Container>
      </section>
      <Newsletter />
    </>
    
  );
};

export default Courses

