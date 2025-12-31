import { motion } from "framer-motion";
import liveTracking from "../../assets/live-tracking.png"
import delivery from "../../assets/safe-delivery.png"
import support from "../../assets/safe-delivery.png"
const trackingCards = [
  {
    id: 1,
    image: liveTracking,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    id: 2,
    image: delivery,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    id: 3,
    image: support,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];


const LiveTrackingSection = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-base-content">
            Live Parcel Tracking
          </h2>
          <p className="mt-2 text-base-content/70">
            Stay informed about your parcels in real-time
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6">
          {trackingCards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card bg-base-100 p-8 shadow-md flex flex-col lg:flex-row overflow-hidden cursor-pointer"
            >
              {/* Left Image */}
              <div className="w-1/4 h-48 lg:h-auto overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-48 h-48 object-cover"
                />
              </div>

              {/* Right Content */}
              <div className=" p-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-base-content/70">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveTrackingSection;
