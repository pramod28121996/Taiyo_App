import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Cases",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgb(53, 162, 235)",
    },
    {
      label: "Recovered",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgb(16 161 60 / 50%)",
    },
    {
      label: "Deaths",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};

export type Props = {
  barData: any;
};
const VerticalBarChart: React.FC<Props> = ({ barData }) => {
  return (
    <Bar
      options={options}
      data={{ labels: barData.allCountries, datasets: barData.datasets }}
    />
  );
};
export default VerticalBarChart;
