import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import LineGraph from './quiz/results/Graph'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const savedGoals = JSON.parse(localStorage.getItem('goals')) || '[]';
const firstGoal = savedGoals.length > 0 ? savedGoals[0] : null;
const storedResults = JSON.parse(localStorage.getItem('results') || '[]');

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: `${firstGoal ? firstGoal.subject : 'Create a goal first to view'} analytics`,
    },
  },
};

const labels = ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Quiz Score',
      data: [90, 87, 92, 95, 83],
      borderColor: 'rgb(232, 18, 121)',
      backgroundColor: 'rgb(232, 18, 121)',
    },
  ],
};

export function Analytics() {
  return <LineGraph results={storedResults} />
};
