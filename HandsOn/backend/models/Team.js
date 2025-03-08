module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    isPublic: { type: DataTypes.BOOLEAN, defaultValue: true }, // Public or private team
  });

  Team.associate = (models) => {
    Team.belongsTo(models.User, { foreignKey: "leaderId", as: "leader" }); // Team leader
    Team.belongsToMany(models.User, {
      through: "TeamMembers",
      as: "members",
    }); // Team members
    Team.hasMany(models.Event, { foreignKey: "teamId", as: "events" }); // Team events
    Team.hasMany(models.TeamInvitation, { foreignKey: "teamId", as: "invitations" }); // Team invitations
  };

  return Team;
};