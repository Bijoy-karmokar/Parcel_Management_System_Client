import { FaBoxOpen, FaTruckPickup, FaRoute, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    icon: <FaBoxOpen />,
    title: "Create Parcel Order",
    description:
      "Easily create a parcel delivery request by providing pickup and delivery details.",
  },
  {
    id: 2,
    icon: <FaTruckPickup />,
    title: "Parcel Pickup",
    description:
      "Our delivery agent picks up the parcel from your doorstep at the scheduled time.",
  },
  {
    id: 3,
    icon: <FaRoute />,
    title: "Track in Real Time",
    description:
      "Track your parcel in real time and get live updates during the delivery process.",
  },
  {
    id: 4,
    icon: <FaCheckCircle />,
    title: "Delivered Successfully",
    description:
      "Your parcel is delivered safely to the destination with confirmation.",
  },
];

/* Container animation */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

/* Card animation */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HowItWorks = () => {
  return (
    <section className="py-16 bg-base-200 mt-10 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-base-content">
            How It Works
          </h2>
          <p className="mt-2 text-base-content/70">
            Simple steps to send and receive your parcels
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                backgroundColor: "var(--p)",
                color: "var(--pc)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card bg-base-100 shadow-md cursor-pointer"
            >
              <div className="card-body items-center text-center">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl mb-4 text-primary"
                >
                  {step.icon}
                </motion.div>

                {/* Title */}
                <h3 className="card-title mt-2">{step.title}</h3>

                {/* Description */}
                <p className="text-sm opacity-80">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
