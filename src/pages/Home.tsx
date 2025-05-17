import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6 py-10">
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to MatIQ</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          AI-Powered Skill Analysis for BJJ Athletes
        </p>
        <div className="flex justify-center gap-4">
  <Link to="/auth">
    <Button variant="outline">Login</Button>
  </Link>
  <Link to="/auth">
    <Button variant="default">Sign Up</Button>
  </Link>
</div>
      </div>

      {/* Intro to Project */}
      <section className="max-w-4xl mx-auto mt-20 space-y-10">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2">What is MatIQ?</h2>
            <p className="text-gray-300">
              MatIQ is an AI-powered tool built to revolutionize skill tracking and match analysis for Brazilian Jiu-Jitsu practitioners. By leveraging live training data and annotator input, MatIQ provides real-time feedback and deep insights into performance — just like chess engines analyze every move.
            </p>
          </CardContent>
        </Card>

        {/* About You */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Meet the Creator</h2>
            <p className="text-gray-300">
              I'm a passionate BJJ practitioner and instructor, blending tech and mat time to create tools that truly reflect what makes grappling intelligent, creative, and measurable. With MatIQ, the goal is to empower fighters to grow smarter, not just tougher.
            </p>
          </CardContent>
        </Card>

        {/* Volunteer Call */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Calling All Volunteers</h2>
            <p className="text-gray-300">
              We need annotators and fighters to help train the AI engine. Whether you're a white belt or black belt, you can contribute valuable data to improve performance predictions and skill recognition. Join us to shape the future of Jiu-Jitsu analytics.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
