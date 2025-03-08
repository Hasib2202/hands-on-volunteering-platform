import React, { useState } from "react";

const EventFilters = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [upcoming, setUpcoming] = useState(false);

  const handleFilter = () => {
    onFilter({ category, location, upcoming });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-xl font-semibold mb-4">Filter Events</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={upcoming}
            onChange={(e) => setUpcoming(e.target.checked)}
            className="mr-2"
          />
          Show Upcoming Only
        </label>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default EventFilters;