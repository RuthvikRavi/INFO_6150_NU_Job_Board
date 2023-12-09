import React, { useRef, useEffect, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import "./Header.css"
import { AuthContext } from '../../context/AuthContext'

var nav_links = []

const Header = () => {

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const {user, dispatch} = useContext(AuthContext);

  if(user && user.role==="admin"){
    
    nav_links = [
      {
        path: './home',
        display: 'Home'
      },
      {
        path: '/about',
        display: 'About'
      },
      {
        path: './jobs',
        display: 'Jobs'
      },
      {
        path: './courses',
        display: 'Courses'
      },
      {
        path: './testimonial',
        display: 'Testimonial'
      }
      ,
      {
        path: './application',
        display: 'Applications'
      }
      ,
      {
        path: './subscription',
        display: 'Subscriptions'
      },
      {
        path:'./home',
        display: <span style={{backgroundColor:"red", padding:"0.25em", color:"white", borderRadius:"0.25em"}}><i className="ri-user-line"></i> {user?.username + ' ('  + user.role[0].toUpperCase() + ')'}</span>
      }
    ]
  
  }else{
    
    nav_links = [
      {
        path: './home',
        display: 'Home'
      },
      {
        path: '/about',
        display: 'About'
      },
      {
        path: './jobs',
        display: 'Jobs'
      },
      {
        path: './courses',
        display: 'Courses'
      },
      {
        path: './testimonial',
        display: 'Testimonial'
      },
      {
        path:'./home',
        display: <span style={{backgroundColor:"red", padding:"0.25em", color:"white", borderRadius:"0.25em"}}><i className="ri-user-line"></i> {user?.username}</span>
      }
    ]
  }

  const logout = ()=>{
    dispatch({type:'LOGOUT'})
    navigate('/')
  }

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc()
    return window.removeEventListener('scroll', stickyHeaderFunc);
  },[])

  const toggleMenu = ()=> menuRef.current.classList.toggle('show__menu');

  return <header className="header" ref={headerRef} style={{zIndex:"1"}}>
    <Container >
      <Row>
      
        <div className="nav_wrapper d-flex align-items-center justify-content-between">
          
          <Link to="/home" className="nav-link">
            NU Jobs
          </Link>
          
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu d-flex align-items-center gap-4">
              {
                nav_links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>

                  </li>
                ))
              }

            </ul>
          </div>
          
          <div className="nav_right d-flex align-items-center  gap-4">
            
            <div className="nav_btns d-flex align-items-center  gap-4">
              {
                user? (
                <>
                <Button className="btn btn-dark" onClick={logout}>Logout</Button>
                </>
                ) : (
                <>
                <Button className='btn secondary__btn auth__btn'> <Link to='/login' style={{color:'#fff'}}>Login</Link></Button>
                <Button className='btn secondary__btn auth__btn'> <Link to='/Register' style={{color:'#fff'}}>Register</Link></Button>
                </>
              )}
            </div>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>

          </div>

        </div>
      
      </Row>
    </Container>
  </header>
}

export default Header