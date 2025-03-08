// Define milestones
const milestones = [20, 50, 100]; // Milestones in hours

const generateCertificate = (user, totalHours) => {
  // Check if the user has reached a milestone
  const milestone = milestones.find((m) => totalHours >= m && totalHours < m + 1);

  if (milestone) {
    // Generate certificate content
    const certificate = `
      Certificate of Achievement
      -------------------------
      This certifies that ${user.name}
      has completed ${milestone} volunteer hours!

      Thank you for your dedication and contribution.
    `;

    return certificate;
  }

  return null; // No milestone reached
};

module.exports = generateCertificate;