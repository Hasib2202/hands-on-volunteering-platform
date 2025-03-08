const { Sequelize } = require("sequelize");
const User = require("./User");
const Event = require("./Event");
const Post = require("./Post");
const Comment = require("./Comment"); // Import the Comment model
const Team = require("./Team");
const TeamInvitation = require("./TeamInvitation"); // Import the TeamInvitation model
const Notification = require("./Notification");
const Contribution = require("./Contribution");
const VolunteerLog = require("./VolunteerLog");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

const models = {
  User: User(sequelize, Sequelize),
  Event: Event(sequelize, Sequelize),
  Post: Post(sequelize, Sequelize),
  Comment: Comment(sequelize, Sequelize), // Initialize the Comment model
  Team: Team(sequelize, Sequelize),
  TeamInvitation: TeamInvitation(sequelize, Sequelize), // Initialize the TeamInvitation model
  Notification: Notification(sequelize, Sequelize),
  Contribution: Contribution(sequelize, Sequelize),
  VolunteerLog: VolunteerLog(sequelize, Sequelize),
};

// In backend/models/index.js
// models.User.belongsToMany(models.Event, { through: "EventAttendees", as: "events" });
// models.Event.belongsToMany(models.User, { through: "EventAttendees", as: "attendees" });


// Apply associations (if defined)
Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
});

module.exports = { sequelize, ...models };
