// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register necessary components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const MetricsChart = ({ data }) => {
//   // Transform the data to format suitable for Chart.js
//   const labels = data.flatMap(team => team.courses.map(course => course.name));
//   const completionRates = data.flatMap(team => team.courses.map(course => course.completionRate));
//   const averageScores = data.flatMap(team => team.courses.map(course => course.averageScore));
//   const averageRatings = data.flatMap(team => team.courses.map(course => course.averageRating));

//   // Data for Completion Rate Chart
//   const completionRateData = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Completion Rate (%)',
//         data: completionRates,
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   // Data for Average Scores Chart
//   const averageScoresData = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Average Scores',
//         data: averageScores,
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//       },
//     ],
//   };

//   // Data for Average Ratings Chart
//   const averageRatingsData = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Average Ratings',
//         data: averageRatings,
//         backgroundColor: 'rgba(255, 159, 64, 0.6)',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Course Metrics',
//       },
//     },
//   };

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//       <div style={{ flex: '1 1 300px' }}>
//         <h2>Completion Rate (%)</h2>
//         <Bar data={completionRateData} options={options} />
//       </div>

//       <div style={{ flex: '1 1 300px' }}>
//         <h2>Average Scores</h2>
//         <Bar data={averageScoresData} options={options} />
//       </div>

//       <div style={{ flex: '1 1 300px' }}>
//         <h2>Average Ratings</h2>
//         <Bar data={averageRatingsData} options={options} />
//       </div>
//     </div>
//   );
// };

// export default MetricsChart;

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MetricsChart = ({ data }) => {
  // Transform the data to format suitable for Chart.js
  const labels = data.flatMap((team) =>
    team.courses.map((course) => course.name)
  );
  const completionRates = data.flatMap((team) =>
    team.courses.map((course) => course.completionRate)
  );
  const averageScores = data.flatMap((team) =>
    team.courses.map((course) => course.averageScore)
  );
  const averageRatings = data.flatMap((team) =>
    team.courses.map((course) => course.averageRating)
  );
  const feedbackCounts = data.flatMap((team) =>
    team.courses.map((course) => course.feedbackCount || 0)
  ); // Assuming feedbackCount is available

  // Data for Completion Rate Chart
  const completionRateData = {
    labels: labels,
    datasets: [
      {
        label: "Completion Rate (%)",
        data: completionRates,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Data for Average Scores Chart
  const averageScoresData = {
    labels: labels,
    datasets: [
      {
        label: "Average Scores",
        data: averageScores,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Data for Average Ratings Chart
  const averageRatingsData = {
    labels: labels,
    datasets: [
      {
        label: "Average Ratings",
        data: averageRatings,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  // Data for Feedback Count Chart
  const feedbackCountsData = {
    labels: labels,
    datasets: [
      {
        label: "Total Feedback Count",
        data: feedbackCounts,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Course Metrics",
      },
    },
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <div style={{ flex: "1 1 300px" }}>
        <h2>Completion Rate (%)</h2>
        <Bar data={completionRateData} options={options} />
      </div>

      <div style={{ flex: "1 1 300px" }}>
        <h2>Average Scores</h2>
        <Bar data={averageScoresData} options={options} />
      </div>

      <div style={{ flex: "1 1 200px" }}>
        {" "}
        {/* Decreased size of this chart */}
        <h2>Average Ratings</h2>
        <Bar data={averageRatingsData} options={options} />
      </div>
    </div>
  );
};

export default MetricsChart;
