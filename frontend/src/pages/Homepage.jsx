import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Properties from "../components/Properties";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Review from "../components/Review";
import Contact from "../components/Contact";
import Core from "../components/Core";
import Footer from "../components/Footer";
import About from "../components/About";

function Homepage() {
  return (
    <div className="montserrat">
      <Navbar />
      <Hero />
      <Stats/>
      <Properties />
      <About  />
      <Core   />
      <Services />
      <Review />
      <Contact />
      <Footer />
    </div>
  );
}

export default Homepage;
