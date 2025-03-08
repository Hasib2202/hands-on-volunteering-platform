module.exports = (sequelize, DataTypes) => {
    const Contribution = sequelize.define("Contribution", {
      hours: { type: DataTypes.FLOAT, defaultValue: 0 },
      date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      comment: { type: DataTypes.STRING, allowNull: true },
    });
    
    Contribution.associate = (models) => {
      Contribution.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Contribution.belongsTo(models.Event, { foreignKey: "eventId", as: "event" });
    };
  
    return Contribution;
  };
  