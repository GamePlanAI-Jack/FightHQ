import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FighterDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Fighter Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">My Stats</h2>
              <p className="text-gray-300 text-sm">
                View your performance breakdown: submissions, escapes, passes, and takedowns.
              </p>
              <Button className="mt-4 w-full">View Stats</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Skill Insights</h2>
              <p className="text-gray-300 text-sm">
                Deep dive into positional strength and improvement areas based on live data.
              </p>
              <Button className="mt-4 w-full">Analyze Skills</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Rankings</h2>
              <p className="text-gray-300 text-sm">
                See how you stack up against your gym and global peers.
              </p>
              <Button className="mt-4 w-full">Check Rankings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Video Library</h2>
              <p className="text-gray-300 text-sm">
                Watch your rolls with overlays, feedback and AI analysis.
              </p>
              <Button className="mt-4 w-full">Watch Footage</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Progress Tracker</h2>
              <p className="text-gray-300 text-sm">
                Track your development over time based on position and outcome data.
              </p>
              <Button className="mt-4 w-full">Track Progress</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Credit System</h2>
              <p className="text-gray-300 text-sm">
                Learn how to earn credits through training footage and annotations.
              </p>
              <Button className="mt-4 w-full">View Credit Info</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
