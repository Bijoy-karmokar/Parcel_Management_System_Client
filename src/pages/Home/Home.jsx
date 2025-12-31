import React from 'react';
import Banner from '../../components/Banner/Banner';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import OurServices from '../../components/services/OurServices';
import BrandSlider from '../../components/BrandSlider/BrandSlider';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <BrandSlider></BrandSlider>
        </div>
    );
};

export default Home;