// import React, { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const LogHoursForm = ({ eventId, onClose }) => {
//   const [hours, setHours] = useState(0);
//   const [description, setDescription] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://localhost:5000/api/volunteer/log-hours",
//         { eventId, hours, description }, // Include eventId in the request body
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success(res.data.message);
//       setHours(0);
//       setDescription("");
//       onClose(); // Close the form after successful submission
//     } catch (err) {
//       console.error("Full error response:", err.response); // Log the full error response
//       toast.error("Error logging hours");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg w-96">
//         <Toaster />
//         <h3 className="text-xl font-semibold mb-4">Log Volunteer Hours</h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Hours</label>
//             <input
//               type="number"
//               value={hours}
//               onChange={(e) => setHours(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LogHoursForm;


import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogHoursForm = ({ eventId, onClose }) => {
  const [hours, setHours] = useState(0);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to log hours");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/volunteer/log-hours",
        { eventId, hours, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setHours(0);
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Full error response:", err.response);
      toast.error("Error logging hours");
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-white">
      <div className="p-8 rounded-lg shadow-xl w-11/12 max-w-lg">
        <Toaster />
        <h3 className="text-2xl font-semibold mb-6 text-center text-[#172521]">
          Log Volunteer Hours
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2B7A78] mb-2">
              Hours
            </label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full p-3 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2B7A78] mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              required
            />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogHoursForm;
