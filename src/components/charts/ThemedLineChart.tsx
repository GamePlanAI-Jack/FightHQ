import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Define the props type for ThemedLineChart
interface ThemedLineChartProps {
  data: Array<any>; // Adjust type according to your data structure
  dataKey: string;
  xKey: string;
  label: string;
}

export const ThemedLineChart: React.FC<ThemedLineChartProps> = ({ data, dataKey, xKey, label }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
