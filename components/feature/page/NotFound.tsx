"use client";
import { FolderOpen } from "lucide-react"; 

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[400px] bg-[#EDF5FF] ">
      <div className="bg-gray-100 p-6 rounded-full mb-6 shadow-sm">
        <FolderOpen className="w-12 h-12 text-gray-400" />
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">
        No Courses Found
      </h3>

      <p className="text-gray-500 max-w-sm mx-auto mb-6 px-[15px]">
        There are currently no courses assigned to this department. Please check back later or contact the administrator.
      </p>

      <button 
        onClick={() => window.history.back()} 
        className="px-6 py-2 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;