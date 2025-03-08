module.exports = (sequelize, DataTypes) => {
    const TeamInvitation = sequelize.define("TeamInvitation", {
      status: { type: DataTypes.ENUM("pending", "accepted", "rejected"), defaultValue: "pending" },
    });
  
    TeamInvitation.associate = (models) => {
      TeamInvitation.belongsTo(models.Team, { foreignKey: "teamId", as: "team" }); // Link to team
      TeamInvitation.belongsTo(models.User, { foreignKey: "userId", as: "user" }); // Link to user
    };
  
    return TeamInvitation;
  };