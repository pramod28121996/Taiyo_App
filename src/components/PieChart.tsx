import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "Cases",
    "Deaths",
    "Recovered",
    "Active",
    "Critical",
    "CasesPerOneMillion",
    "DeathsPerOneMillion",
    "Tests",
    "Population",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3, 5, 5, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 125, 1)",
        "rgba(76, 159, 64, 1)",
        "rgba(75, 88, 30, 0.2)",
        "rgba(153, 15, 255, 0.2)",
        "rgba(10, 159, 64, 0.2)",
      ],
      borderWidth: 2,
    },
  ],
};

export type Props = {
  pieData: any;
};
const PieChart: React.FC<Props> = ({ pieData }) => {
  return <Pie data={{ ...data, datasets: pieData.datasets }} />;
};
export default PieChart;
