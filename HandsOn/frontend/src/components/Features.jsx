import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Discover Events",
    description: "Find and join volunteer events in your community.",
    icon: "🎉",
    link: "/events", // Link to the Events page
    buttonText: "Explore",
  },
  {
    title: "Track Impact",
    description: "Log your volunteer hours and track your contributions.",
    icon: "📊",
    link: "/log-event", // Link to the LogEvent page
    buttonText: "Explore",
  },
  {
    title: "Earn Certificates",
    description:
      "Get recognized for your efforts with auto-generated certificates.",
    icon: "🏅",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-[#DEF2F1]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#172521]">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#FEFFFF] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#172521]">
                  {feature.title}
                </h3>
                <p className="text-[#2B7A78]">{feature.description}</p>
                {feature.link && (
                  <Link
                    to={feature.link}
                    className="mt-4 inline-block bg-[#3AAFA9] text-[#FEFFFF] px-6 py-2 rounded-lg hover:bg-[#2B7A78] transition duration-300"
                  >
                    {feature.buttonText ? feature.buttonText : "Explore"}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
