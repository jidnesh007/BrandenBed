import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

// Animation variants for section transitions
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const About = () => {
  return (
    <div id="about" className="bg-white font-sans text-gray-800">
      {/* Header Section */}
      <div className="bg-gray-50/80 py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-left text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="mt-5 text-lg text-gray-600 max-w-2xl text-left leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Pioneering a seamless, reliable, and trustworthy rental experience
            in the vibrant heart of Berlin.
          </motion.p>
        </div>
      </div>

      {/* Section 1: Our Mission */}
      <motion.section
        className=" container mx-auto px-6 lg:px-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="text-left">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              At BrandenBed, we understand the challenges of finding
              accommodation in a new city. Our goal is to deliver a stress-free,
              reliable service that connects students and professionals with
              quality apartments that suit their needs and budgets.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We foster a supportive environment where residents can focus on
              their goals and enjoy their time in Berlin.
            </p>
          </div>

          {/* Image Collage 1 */}
          <div className="relative h-[550px] sm:h-[600px] w-full">
            <motion.div
              className="absolute top-0 left-0 w-2/3 h-2/5 bg-gray-300 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, x: -20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src="/images/ab1.jpg"
                alt="Modern Bedroom 1"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute right-0 top-[20%] w-1/2 h-3/5 bg-gray-300 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, x: 20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src="/images/ab2.jpg"
                alt="Bright Living Space"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-[15%] w-3/5 h-2/5 bg-gray-300 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src="/images/ab3.jpg"
                alt="Sleek Modern Kitchen"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 2: Why Choose Us */}
      <motion.section
        className="bg-gray-50/80 py-20 sm:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Collage 2 */}
          <div className="relative h-[550px] sm:h-[600px] w-full order-last lg:order-first">
            <motion.div
              className="absolute top-0 right-0 w-3/5 h-2/5 bg-gray-300 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, x: 20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src="/images/ab4.jpg"
                alt="Building Exterior"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute left-0 top-1/4 w-3/4 h-3/5 bg-gray-300 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src="/images/ab5.jpg"
                alt="Cozy Living Room"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute bottom-0 right-1/4 w-3/5 h-2/5 bg-gray-300 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src="/images/ab6.jpg"
                alt="Modern Dining Area"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="text-left">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
              Why Choose BrandenBed
            </h2>
            <ul className="space-y-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center mr-5 mt-1 shadow-md">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Local Expertise
                  </h3>
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    Deep knowledge of the Berlin housing scene and international
                    student needs.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center mr-5 mt-1 shadow-md">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Trusted Partnerships
                  </h3>
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    Reputable property owners and quality housing in prime
                    locations.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center mr-5 mt-1 shadow-md">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Commitment to Excellence
                  </h3>
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    Exceptional service and long-term relationships for a
                    positive rental experience.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
