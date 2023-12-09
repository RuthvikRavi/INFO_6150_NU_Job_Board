import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../router/Routers'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Layout = () => {
  return (
    <>
    <Header/>
    <Routers/>
    <Footer/>
    </>
  )
}

export default Layout