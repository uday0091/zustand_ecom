import React from 'react';
import Footer from '../components/Footer';
import Home_slide from "../components/Home_slide"
import LatestProduct from '../components/LatestProduct';

const Home = () => {
    return (
        <>
            <div className='page mb-5'>
                <Home_slide/>
                
            </div>
          
            <LatestProduct/>
            <Footer/>
        </>
    );
}

export default Home;
