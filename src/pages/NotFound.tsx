// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="mb-4 text-lg">Page not found</p>
      <Link to="/" className="text-blue-600 underline">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
