import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEventForm from "./components/CreateEventForm";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import CreateHelpRequestForm from "./components/CreateHelpRequestForm";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import CreateTeamForm from "./components/CreateTeamForm";
import Notifications from "./pages/Notifications";
import VolunteerHistory from "./pages/VolunteerHistory";
import LogHoursForm from "./components/LogHoursForm";
import Leaderboard from "./components/Leaderboard";
import Navigation from "./components/Navigation";
import PendingLogs from "./components/PendingLogs";
import Certificates from "./components/Certificates";
import LandingPage from "./pages/LandingPage"; // Import the LandingPage
import Navbar from "./components/Navbar"; // Import the Navbar component
import LogEvent from "./pages/LogEvent"; // Import the LogEvent page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createeventform" element={<CreateEventForm />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/create-help-request" element={<CreateHelpRequestForm />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:id" element={<TeamDetails />} />
        <Route path="/create-team" element={<CreateTeamForm />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/volunteer-history" element={<VolunteerHistory />} />
        <Route path="/log-hours" element={<LogHoursForm />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/pending-logs" element={<PendingLogs />} />
        <Route path="/certificates" element={<Certificates />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<LandingPage />} /> {/* Default route */}
        <Route path="/log-event" element={<LogEvent />} /> {/* Add a new route for the LogEvent page */}
      </Routes>
    </Router>
  );
};

export default App;
