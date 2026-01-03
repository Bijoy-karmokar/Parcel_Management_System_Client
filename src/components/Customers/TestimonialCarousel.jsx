import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gari from "../../assets/customer-top.png"

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "The parcel tracking system is incredibly accurate and easy to use. I can see exactly where my package is at any moment, which gives me peace of mind.",
      name: "Sarah Johnson",
      title: "Small Business Owner",
      avatar: "SJ"
    },
    {
      id: 2,
      text: "Fast delivery and excellent customer service! The real-time notifications kept me informed every step of the way. Highly recommend this service.",
      name: "Michael Chen",
      title: "E-commerce Seller",
      avatar: "MC"
    },
    {
      id: 3,
      text: "I've been using this delivery service for months now. The reliability and speed are unmatched. My customers are always satisfied with the delivery experience.",
      name: "Priya Sharma",
      title: "Online Retailer",
      avatar: "PS"
    },
    {
      id: 4,
      text: "The dashboard makes managing multiple deliveries so simple. I can schedule pickups, track all my parcels, and communicate with drivers seamlessly.",
      name: "David Martinez",
      title: "Logistics Manager",
      avatar: "DM"
    },
    {
      id: 5,
      text: "Affordable pricing without compromising on quality. The delivery times are consistent and the packaging handling is professional.",
      name: "Emma Wilson",
      title: "Startup Founder",
      avatar: "EW"
    },
    {
      id: 6,
      text: "Best parcel delivery service I've used! The API integration was smooth and the support team is always helpful when I need assistance.",
      name: "James Brown",
      title: "Tech Entrepreneur",
      avatar: "JB"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Calculate which testimonials to show (3 visible cards)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  const visibleCards = getVisibleTestimonials();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      {/* Header Section */}
      <img className='mx-auto mb-2' src={gari} alt="" />
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What our customers are saying
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Enhance delivery efficiency, tracking accuracy, and customer satisfaction effortlessly. 
          Achieve reliable service, reduce delays, and strengthen your logistics with ease!
        </p>
      </div>

      {/* Testimonial Cards Container */}
      <div className="max-w-6xl mx-auto relative">
        <div className="relative h-96 mb-12">
          {visibleCards.map((testimonial, idx) => {
            const isCenter = testimonial.position === 0;
            const isLeft = testimonial.position === -1;
            const isRight = testimonial.position === 1;

            return (
              <div
                key={testimonial.id}
                className={`absolute top-0 w-full md:w-2/3 transition-all duration-500 ease-in-out ${
                  isCenter
                    ? 'left-1/2 -translate-x-1/2 z-20 opacity-100 scale-100'
                    : isLeft
                    ? 'left-0 z-10 opacity-40 scale-90 pointer-events-none'
                    : 'right-0 z-10 opacity-40 scale-90 pointer-events-none'
                }`}
              >
                <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12">
                  {/* Quote Mark */}
                  <div className="text-6xl md:text-7xl text-teal-400 leading-none mb-6 font-serif">
                    "
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 min-h-24">
                    {testimonial.text}
                  </p>

                  {/* Dashed Divider */}
                  <div className="border-t-2 border-dashed border-gray-300 mb-6"></div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index 
                    ? 'w-3 h-3 bg-gray-900' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-500 transition shadow-md"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;