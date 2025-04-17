import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Entry } from "../types/tracker";

Chart.register(...registerables);

export const ChartSection = ({ data }: { data: Entry[] }) => {
  const labels = data.map(d => new Date(d.date).toLocaleDateString());

  return (
    <div className="card">
      <h2>Progress</h2>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Workout (min)",
              data: data.map(d => d.workoutMinutes),
              borderColor: "green",
              fill: false,
            },
            {
              label: "Calories",
              data: data.map(d => d.calories),
              borderColor: "orange",
              fill: false,
            },
            {
              label: "Sleep (hrs)",
              data: data.map(d => d.sleepHours),
              borderColor: "blue",
              fill: false,
            },
          ],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
};
