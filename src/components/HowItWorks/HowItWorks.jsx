import { FaBoxOpen, FaTruckPickup, FaRoute, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaBoxOpen className="text-4xl text-primary" />,
      title: "Create Parcel Order",
      description:
        "Easily create a parcel delivery request by providing pickup and delivery details.",
    },
    {
      id: 2,
      icon: <FaTruckPickup className="text-4xl text-primary" />,
      title: "Parcel Pickup",
      description:
        "Our delivery agent picks up the parcel from your doorstep at the scheduled time.",
    },
    {
      id: 3,
      icon: <FaRoute className="text-4xl text-primary" />,
      title: "Track in Real Time",
      description:
        "Track your parcel in real time and get live updates during the delivery process.",
    },
    {
      id: 4,
      icon: <FaCheckCircle className="text-4xl text-primary" />,
      title: "Delivered Successfully",
      description:
        "Your parcel is delivered safely to the destination with confirmation.",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-base-content">
            How It Works
          </h2>
          <p className="mt-2 text-base-content/70">
            Simple steps to send and receive your parcels
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="card-body items-center text-center">
                {step.icon}
                <h3 className="card-title mt-4">{step.title}</h3>
                <p className="text-sm text-base-content/70">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
