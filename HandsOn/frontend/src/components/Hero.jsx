import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHandsHelping, FaHeart, FaUsers, FaLightbulb } from "react-icons/fa"; // Professional icons

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#172521] text-[#DEF2F1] py-32">
      {/* Content */}
      <div className="container mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold mb-6"
        >
          Make a Difference with{" "}
          <span className="text-[#3AAFA9]">HandsOn</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
          Join a community-driven platform to create real-world impact through
          volunteering. Together, we can build a better future.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link to="/register">
            {/* <button className="bg-[#3AAFA9] text-[#FEFFFF] px-8 py-3 rounded-lg hover:bg-[#2B7A78] transition duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2">
              <FaHandsHelping className="text-xl" />
              <span>Get Started</span>
            </button> */}

            <button className="bg-[#3AAFA9] text-[#FEFFFF] px-8 py-3 rounded-lg hover:bg-[#2B7A78] transition duration-300 shadow-lg transform hover:scale-105">
              Get Started
            </button>
            
          </Link>
        </motion.div>
      </div>

      {/* Moving Text Animation with Icons */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 z-0"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        <div className="flex space-x-8 items-center">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: i * 0.5,
              }}
            >
              {i === 0 && <FaHandsHelping className="text-[#3AAFA9] text-2xl" />}
              {i === 1 && <FaHeart className="text-[#3AAFA9] text-2xl" />}
              {i === 2 && <FaUsers className="text-[#3AAFA9] text-2xl" />}
              {i === 3 && <FaLightbulb className="text-[#3AAFA9] text-2xl" />}
              <p className="text-[#3AAFA9] opacity-70 text-xl font-bold whitespace-nowrap">
                {i === 0 && "Volunteer"}
                {i === 1 && "Empower"}
                {i === 2 && "Inspire"}
                {i === 3 && "Transform"}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;