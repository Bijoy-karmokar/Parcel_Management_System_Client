import React from 'react';
import Banner from '../../components/Banner/Banner';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import OurServices from '../../components/services/OurServices';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;