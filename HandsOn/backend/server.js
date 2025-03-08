const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const eventsRoutes = require("./routes/events");
const postsRoutes = require("./routes/posts");
const teamsRoutes = require("./routes/teams");
const notificationsRoutes = require("./routes/notifications");
const profileRoutes = require("./routes/profile");  // <-- new import
const contributionsRoutes = require("./routes/contributions"); // new import
const volunteerRoutes = require("./routes/volunteer");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment"); // Import the comment route
const { sequelize } = require("./models");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/profile", profileRoutes); // <-- new mount
app.use("/api/contributions", contributionsRoutes); // new mount
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentRoutes); // Use the comment route

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
