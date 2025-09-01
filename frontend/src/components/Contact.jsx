import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG Icons for different states and elements
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const Contact = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle final form submission
      console.log("Form Submitted:", formData);
      setStep(4); // Move to success state
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getButtonText = () => {
    if (step === 1) return "Let's Start";
    if (step === 2) return "Next: Your Message";
    if (step === 3) return "Send Message";
    return "";
  };

  // Animation Variants
  const formVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Ready to Create?
        </motion.h2>
        <motion.p
          className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Tell us about your vision. We're here to help you bring it to life.
        </motion.p>
      </div>

      <div className="max-w-xl mx-auto mt-16 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        <AnimatePresence mode="wait">
          {step === 4 ? (
            // Success State
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                <CheckIcon />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mt-6">
                Thank You!
              </h3>
              <p className="text-gray-600 mt-2">
                Your message has been sent. We'll be in touch soon.
              </p>
            </motion.div>
          ) : (
            // Multi-step Form
            <form onSubmit={handleNext} className="relative">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={formVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                  >
                    <label className="block text-2xl font-bold text-gray-800 mb-4">
                      What's your name?
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={formVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                  >
                    <label className="block text-2xl font-bold text-gray-800 mb-4">
                      And your email?
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={formVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                  >
                    <label className="block text-2xl font-bold text-gray-800 mb-4">
                      What's on your mind?
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Tell us about your project, idea, or question..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input resize-none"
                      required
                    ></textarea>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8">
                <motion.button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center text-lg shadow-xl hover:bg-indigo-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getButtonText()}
                  <span className="ml-2">
                    <ArrowRightIcon />
                  </span>
                </motion.button>
              </div>
            </form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default Contact;

// Add this to your main CSS file or a <style> tag to style the form inputs globally for this component
/*
.form-input {
  @apply w-full bg-gray-100 border-2 border-transparent rounded-lg text-lg text-gray-800 placeholder-gray-400 px-5 py-3;
  @apply focus:outline-none focus:border-indigo-500 focus:bg-white;
  @apply transition-all duration-300;
}
*/
