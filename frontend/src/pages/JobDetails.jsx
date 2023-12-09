import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/job-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";

import Jobs from "../components/Jobs/Jobs";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [jobRating, setJobRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: job, loading, error } = useFetch(`${BASE_URL}/jobs/${id}`);

  const {
    // photo,
    title,
    desc,
    salary,
    address,
    applications,
    city,
    // distance,
    companySize,
  } = job;

  const options = { day: "numeric", month: "long", year: "numeric" };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [job]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="job__content">
                  <img src="" alt="" />

                  <div className="job__info">
                    <h2>{title}</h2>

                    <div
                      className="d-flex
            align-items-center gap-5"
                    >
                      <span className="job__rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                        {applications?.length === 0 ? (
                          "New"
                        ) : (
                          <span> ({applications?.length}) </span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>
                    <div className="job__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i> {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i> ${salary}/hour
                      </span>
                      {/* <span><i className='ri-map-pin-time-line'></i> {distance} k/m</span> */}
                      <span>
                        <i className="ri-group-line"></i> Company Size: {companySize}
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <Jobs job={job} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default JobDetails;
