// // Backend Model (backend/models/VolunteerLog.js)
// module.exports = (sequelize, DataTypes) => {
//     const VolunteerLog = sequelize.define("VolunteerLog", {
//       userId: DataTypes.INTEGER,
//       eventId: DataTypes.INTEGER,
//       hours: DataTypes.FLOAT,
//       description: DataTypes.STRING,
//       status: {
//         type: DataTypes.ENUM("pending", "verified", "rejected"),
//         defaultValue: "pending",
//       },
//     });
  
//     VolunteerLog.associate = (models) => {
//       VolunteerLog.belongsTo(models.User, { foreignKey: "userId" });
//       VolunteerLog.belongsTo(models.Event, { foreignKey: "eventId" });
//     };
  
//     return VolunteerLog;
//   };

module.exports = (sequelize, DataTypes) => {
  const VolunteerLog = sequelize.define("VolunteerLog", {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    hours: DataTypes.FLOAT,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("pending", "verified", "rejected"),
      defaultValue: "pending",
    },
  });

  // Define associations
  VolunteerLog.associate = (models) => {
    VolunteerLog.belongsTo(models.User, { foreignKey: "userId", as: "user" }); // Alias: "user"
    VolunteerLog.belongsTo(models.Event, { foreignKey: "eventId", as: "event" }); // Alias: "event"
  };

  return VolunteerLog;
};