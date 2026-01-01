import React from 'react';
import merchant from "../../assets/location-merchant.png"

const BeMerchant = () => {
    return (
        <div className="hero bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-blue-900 text-white mt-10 rounded-2xl p-5 md:p-20">
  <div className="hero-content flex-col items-center justify-center lg:flex-row-reverse">
    <img
      src={merchant}
      className="w-3/4 rounded-lg shadow-lg"
    />
    <div>
      <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
      <p className="py-6">
        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
      </p>
     <div className='flex flex-col md:flex-row gap-3'>
        <button className="btn btn-primary text-black rounded-full">Become a Merchant</button>
      <button className="btn btn-primary btn-outline rounded-full ml-3">Earn with ZapShift Courier</button>
     </div>
    </div>
  </div>
</div>
    );
};

export default BeMerchant;