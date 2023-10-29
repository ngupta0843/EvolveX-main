import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import CustomCard from "../../custom/Card";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Equalizer, PieChart, ShowChart } from "@mui/icons-material";

Chart.register(...registerables);
Chart.defaults.color = "#11101d";
Chart.defaults.font.family = "Poppins";

export default function LineGraph(props) {
  const { results } = props;
  const [chartType, setChartType] = useState("line");
  const barResults = results.slice(-4).map((result) => result.score);
  const lineResults = results.slice(-4).map((result) => ({
    date: result.date,
    score: result.score,
  }));

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 5,
        hoverRadius: 6,
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
      bar: {
        borderWidth: 2,
        borderRadius: 5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const groupedData = barResults.reduce((acc, score) => {
    acc[score] = (acc[score] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Frequency",
        data: Object.values(groupedData),
        backgroundColor: [
          "rgba(56,52,94,0.8)",
          "rgba(75,70,127,0.8)",
          "rgba(94,88,160,0.8)",
          "rgba(124,119,180,0.8)",
          "rgba(156,152,198,0.8)",
        ],
        borderColor: [
          "rgb(56,52,94)",
          "rgb(75,70,127)",
          "rgb(94,88,160)",
          "rgb(124,119,180)",
          "rgb(156,152,198)",
        ],
        color: "#11101d",
      },
    ],
  };

  const pieData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Frequency",
        data: Object.values(groupedData),
        backgroundColor: [
          "rgba(56,52,94,0.8)",
          "rgba(75,70,127,0.8)",
          "rgba(94,88,160,0.8)",
          "rgba(124,119,180,0.8)",
          "rgba(156,152,198,0.8)",
        ],
        borderColor: [
          "rgb(56,52,94)",
          "rgb(75,70,127)",
          "rgb(94,88,160)",
          "rgb(124,119,180)",
          "rgb(156,152,198)",
        ],
        color: "#11101d",
      },
    ],
  };

  const lineData = {
    labels: lineResults.map((result) => result.date),
    datasets: [
      {
        label: "Score",
        data: lineResults.map((result) => result.score),
        fill: false,
        backgroundColor: "#5e58a0",
        borderColor: "#11101d",
        color: "#11101d",
      },
    ],
  };

  const handleChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <CustomCard
      title="Results Graph"
      action={
        <FormControl size="medium">
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chartType}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value="line">
              <ShowChart />
              &nbsp;Line
            </MenuItem>
            <MenuItem value="bar">
              <Equalizer />
              &nbsp;Bar
            </MenuItem>
            <MenuItem value="pie">
              <PieChart />
              &nbsp;Pie
            </MenuItem>
          </Select>
        </FormControl>
      }
      text={
        chartType === "line" ? (
          <Line options={options} data={lineData} />
        ) : chartType === "bar" ? (
          <Bar options={options} data={barData} />
        ) : (
          <Pie options={options} data={pieData} />
        )
      }
    />
  );
}
