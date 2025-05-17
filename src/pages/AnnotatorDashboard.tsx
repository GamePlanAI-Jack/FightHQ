
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnnotatorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Annotator Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Annotation Stats */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Annotation Stats</h2>
            <ul className="text-gray-300 space-y-2">
              <li>Total Annotations Completed: 0</li>
              <li>Annotation Accuracy Score: 0%</li>
              <li>Outlier Flags: 0</li>
              <li>Credits Earned: 0</li>
            </ul>
          </CardContent>
        </Card>

        {/* Video Review Queue */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Video Review Queue</h2>
            <p className="text-gray-300 mb-4">
              Review pending videos to annotate positions and actions.
            </p>
            <Button variant="default">Start Annotating</Button>
          </CardContent>
        </Card>

        {/* Performance Breakdown */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Annotation Performance Breakdown</h2>
            <p className="text-gray-300">
              View where you align with other annotators and where disagreements happen most.
            </p>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Annotator Leaderboard</h2>
            <p className="text-gray-300">See how you rank among fellow annotators.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
