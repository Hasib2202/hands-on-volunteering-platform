const express = require("express");
const router = express.Router();
const { User } = require("../models");
const auth = require("../middleware/auth");
const generateCertificate = require("../utils/certificate");

// Define milestones
const milestones = [20, 50, 100]; // Milestones in hours

// Fetch Certificates
// router.get("/certificates", auth, async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);
//     const totalHours = user.points / 5; // Convert points to hours

//     // Generate certificates for all milestones reached
//     const certificates = milestones
//       .filter((m) => totalHours >= m)
//       .map((m) => generateCertificate(user, m));

//     res.json(certificates);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching certificates", error: err.message });
//   }
// });

router.get("/certificates", auth, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      const totalHours = user.points / 5; // Convert points to hours
  
      console.log("User ID:", user.id); // Debugging
      console.log("Total Hours:", totalHours); // Debugging
  
      // Generate certificates for all milestones reached
      const certificates = milestones
        .filter((m) => totalHours >= m)
        .map((m) => generateCertificate(user, m));
  
      console.log("Certificates:", certificates); // Debugging
      res.json(certificates);
    } catch (err) {
      console.error("Error fetching certificates:", err); // Debugging
      res.status(500).json({ message: "Error fetching certificates", error: err.message });
    }
  });

module.exports = router;