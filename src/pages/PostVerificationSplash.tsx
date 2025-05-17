// src/pages/PostVerification.tsx

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React from "react";

export default function PostVerification() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Thank you for verifying your email!
      </h1>
      <p className="text-lg text-gray-300 text-center mb-8 max-w-xl">
        Your account has been successfully verified. Now, choose how you'd like to proceed:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
        <Button
          className="h-32 text-xl font-semibold rounded-2xl"
          onClick={() => navigate("/fighter-dashboard")}
        >
          Fighter Dashboard
        </Button>

        <Button
          className="h-32 text-xl font-semibold rounded-2xl"
          variant="outline"
          onClick={() => navigate("/annotator-dashboard")}
        >
          Annotator Dashboard
        </Button>
      </div>
    </div>
  );
}
