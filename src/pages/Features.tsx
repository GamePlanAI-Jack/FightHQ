import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">MatIQ Features</h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Unlock your Jiu-Jitsu potential through real-time analysis and
          intelligent feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">AI Action Scoring</h2>
            <p className="text-gray-400">
              Every movement is rated using a chess-style Elo system to track
              your technique’s effectiveness.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Fighter Dashboard</h2>
            <p className="text-gray-400">
              Deep dive into your guard retention, passing, submissions, and
              escapes with visual breakdowns and stats.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Annotator Dashboard</h2>
            <p className="text-gray-400">
              Track your contributions, earn credibility, and help train the
              model with your expertise.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Position-Based Analysis</h2>
            <p className="text-gray-400">
              Explore performance in guard, mount, back control, and stand-up
              scenarios.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Ranking & Credit System</h2>
            <p className="text-gray-400">
              Earn credits by annotating, sparring, and improving — and climb
              the MatIQ leaderboard.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Training Feedback</h2>
            <p className="text-gray-400">
              Receive AI-generated suggestions after each roll to identify
              patterns and improve faster.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-16">
        <Button size="lg" className="text-lg px-8 py-4">
          Join the Project
        </Button>
      </div>
    </div>
  );
}
