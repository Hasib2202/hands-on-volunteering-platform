import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/dashboard" className="text-white hover:text-gray-200">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/log-hours" className="text-white hover:text-gray-200">
            Log Hours
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" className="text-white hover:text-gray-200">
            Leaderboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;