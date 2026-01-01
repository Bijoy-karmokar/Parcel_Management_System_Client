import { motion } from "framer-motion";
import brand1 from "../../assets/brands/amazon.png";
import brand2 from "../../assets/brands/amazon_vector.png";
import brand3 from "../../assets/brands/casio.png";
import brand4 from "../../assets/brands/moonstar.png";
import brand5 from "../../assets/brands/randstad.png";
import brand6 from "../../assets/brands/star.png";
import brand7 from "../../assets/brands/start_people.png";


const logos = [
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7,
];

const BrandSlider = () => {
  return (
    <section className="py-14 mt-10 bg-base-200 rounded-xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section title */}
        <h2 className="text-center text-2xl font-bold mb-8">
          Trusted by Leading Brands
        </h2>

        {/* Slider */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-12 w-max"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
          >
            {/* duplicate logos for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="brand"
                  className="h-8 w-auto object-contain transition duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
