import React from "react";

const LogoMark = () => {
  return (
    <div className="flex items-center space-x-2 select-none">
      <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
        <span className="text-white font-extrabold text-2xl">P</span>

        <div className="absolute inset-0 rounded-xl bg-blue-400/20 blur-md"></div>
      </div>

      <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-transparent bg-clip-text drop-shadow-sm">
        Portify
      </h1>
    </div>
  );
};

export default LogoMark;
