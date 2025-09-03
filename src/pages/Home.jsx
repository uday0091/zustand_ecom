import React from 'react';
import Footer from '../components/Footer';
import Home_slide from "../components/Home_slide"
import LatestProduct from '../components/LatestProduct';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className='page mb-5'>
                <Home_slide/>
                
            </div>
          
            <LatestProduct/>
            <Footer/>
            <div className='fixed-bottom right-0 bottom-0 p-2' style={{zIndex:"6"}}>
                <Link to="http://wa.me/918273110294?text= hello how can help you " target='_blank'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png' width="75px"/>
                </Link>
            </div>
        </>
    );
}

export default Home;
