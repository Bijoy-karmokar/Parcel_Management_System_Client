import React from 'react';
import Banner from '../../components/Banner/Banner';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import OurServices from '../../components/services/OurServices';
import BrandSlider from '../../components/BrandSlider/BrandSlider';
import LiveTrackingSection from '../../components/LiveTrackingSection/LiveTrackingSection';
import BeMerchant from '../../components/BeMerchant/BeMerchant';
import FrequentlySection from '../../components/FrequentlySection/FrequentlySection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <BrandSlider></BrandSlider>
            <LiveTrackingSection></LiveTrackingSection>
            <BeMerchant></BeMerchant>
            <FrequentlySection></FrequentlySection>
        </div>
    );
};

export default Home;