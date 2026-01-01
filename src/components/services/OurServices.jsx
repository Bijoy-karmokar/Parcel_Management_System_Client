import services from "../../../data/servicesData.json";
import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";

const icons = [
  <FaShippingFast />,
  <FaMapMarkedAlt />,
  <FaWarehouse />,
  <FaMoneyBillWave />,
  <FaBuilding />,
  <FaUndoAlt />,
];

const badgeColor = {
  Popular: "badge-primary",
  New: "badge-secondary",
};


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/* Card animation */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const OurServices = () => {
  return (
    <section className="py-16 mt-10 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="mt-2 text-base-content/70">
            Smart logistics solutions tailored for your business
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                backgroundColor: "var(--p)",
                color: "var(--pc)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card bg-base-200 shadow-md cursor-pointer"
            >
              <div className="card-body items-center text-center relative">
                {/* Badge */}
                {service.badge && (
                  <div
                    className={`badge absolute top-4 right-4 ${badgeColor[service.badge]}`}
                  >
                    {service.badge}
                  </div>
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl mb-4 text-primary"
                >
                  {icons[index]}
                </motion.div>

                {/* Title */}
                <h3 className="card-title text-lg">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm opacity-80">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
