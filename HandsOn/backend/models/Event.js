module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    cause: { type: DataTypes.STRING, allowNull: false },
    maxAttendees: { type: DataTypes.INTEGER, allowNull: true }, // Optional
  });

  Event.associate = (models) => {
    Event.belongsToMany(models.User, {
      through: "EventAttendees",
      as: "attendees",
    });
  };

  return Event;
};