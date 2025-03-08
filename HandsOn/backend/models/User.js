// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define("User", {
//     email: { type: DataTypes.STRING, unique: true, allowNull: false },
//     password: { type: DataTypes.STRING, allowNull: false },
//     name: { type: DataTypes.STRING, allowNull: false },
//     skills: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
//     causes: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
//     points: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0,
//     },
//   });

//   // Define associations (if any)
//   User.associate = (models) => {
//     User.hasMany(models.VolunteerLog, { foreignKey: "userId" });
//     User.belongsToMany(models.Event, { through: "EventAttendees", as: "events" });
//   };

//   return User;
// };

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    skills: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    causes: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  // Define associations
  User.associate = (models) => {
    User.hasMany(models.VolunteerLog, { foreignKey: "userId", as: "logs" });
  };

  return User;
};