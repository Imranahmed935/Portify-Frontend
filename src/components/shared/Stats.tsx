import React from "react";
import { Folder, Users, Award } from "lucide-react";

const Stats = () => {
  return (
    <div className="lg:px-0 px-4">
      <h2 className="text-2xl font-semibold  py-6">Portfolio Stats</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
   
        <div className="bg-[#101828] rounded-xl shadow-lg p-6 text-white flex flex-col items-center">
          <Folder className="w-8 h-8 mb-3 text-blue-400" />
          <span className="text-2xl lg:text-4xl font-bold">35</span>
          <p className="text-sm mt-1">Projects Completed</p>
          <div className="w-full h-16 bg-blue-900 rounded mt-4"></div>
        </div>

        
        <div className="bg-[#101828] rounded-xl shadow-lg p-6 text-white flex flex-col items-center">
          <Users className="w-8 h-8 mb-3 text-green-400" />
          <span className="text-2xl lg:text-4xl font-bold">15</span>
          <p className="text-sm mt-1">Clients Worked With</p>
          <div className="w-full h-16 bg-green-900 rounded mt-4"></div>
        </div>

        <div className="bg-[#101828] rounded-xl shadow-lg p-6 text-white flex flex-col items-center">
          <Award className="w-8 h-8 mb-3 text-yellow-400" />
          <span className="text-2xl lg:text-4xl font-bold">3</span>
          <p className="text-sm mt-1">Awards Received</p>
          <div className="w-full h-16 bg-yellow-900 rounded mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
