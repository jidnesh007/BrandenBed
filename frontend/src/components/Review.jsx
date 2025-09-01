import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Sample data with added detail for richer cards
const reviews = [
  {
    id: 1,
    text: "This is a game-changer. The performance and design are unparalleled.",
    name: "Alex Johnson",
    company: "QuantumLeap",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    text: "An absolute pleasure to work with. They delivered beyond our wildest dreams.",
    name: "Samantha Carter",
    company: "Stellar Solutions",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    text: "The attention to detail is astonishing. Every pixel feels intentional.",
    name: "Marcus Bell",
    company: "Innovate Inc.",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: 4,
    text: "Our productivity has skyrocketed. We couldn't have done it without them.",
    name: "Jessica Chen",
    company: "Momentum",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    text: "Five stars are not enough. This is the new standard for excellence.",
    name: "David Foster",
    company: "Apex Designs",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    id: 6,
    text: "Seamless integration and flawless execution. Highly recommended.",
    name: "Olivia Nguyen",
    company: "Synergy",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
  },
];

// Reusable ReviewCard component with alternating styles
const ReviewCard = ({ review, isEven }) => (
  <div
    className={`flex-shrink-0 w-[450px] p-8 rounded-3xl mx-4 transition-all duration-300
      ${
        isEven
          ? "bg-white shadow-lg border border-gray-200"
          : "bg-gray-900 text-white shadow-2xl"
      }
    `}
  >
    <div className="flex items-center mb-5">
      <img
        src={review.avatar}
        alt={review.name}
        className={`w-14 h-14 rounded-full mr-5 border-2 ${
          isEven ? "border-gray-200" : "border-gray-600"
        }`}
      />
      <div>
        <p
          className={`font-bold text-lg ${
            isEven ? "text-gray-900" : "text-white"
          }`}
        >
          {review.name}
        </p>
        <p
          className={`text-sm ${
            isEven ? "text-indigo-500" : "text-indigo-300"
          } font-medium`}
        >
          {review.company}
        </p>
      </div>
    </div>
    <p
      className={`text-lg italic leading-relaxed ${
        isEven ? "text-gray-700" : "text-gray-300"
      }`}
    >
      "{review.text}"
    </p>
  </div>
);

// Main Review component with parallax scroll effect
const Review = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Create a parallax effect by moving rows at different speeds
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  return (
    <section
      ref={targetRef}
      className="relative h-auto py-32 bg-gray-100 text-gray-900 overflow-hidden"
    >
      <div className="text-center mb-24 max-w-4xl mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Voices of Our CLients
        </h2>
        <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
          We're proud to build relationships. Here's what our Clients have to
          say about the journey.
        </p>
      </div>

      {/* Rows with parallax scroll */}
      <div className="space-y-12">
        {/* First Row - Scrolls from left to right */}
        <motion.div style={{ x: xLeft }} className="flex">
          {[...reviews.slice(0, 3), ...reviews.slice(0, 3)].map(
            (review, index) => (
              <ReviewCard
                key={`r1-${index}`}
                review={review}
                isEven={index % 2 === 0}
              />
            )
          )}
        </motion.div>

        {/* Second Row - Scrolls from right to left */}
        <motion.div style={{ x: xRight }} className="flex">
          {[...reviews.slice(3, 6), ...reviews.slice(3, 6)].map(
            (review, index) => (
              <ReviewCard
                key={`r2-${index}`}
                review={review}
                isEven={index % 2 !== 0}
              />
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Review;
