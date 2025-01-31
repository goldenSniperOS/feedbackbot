import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

  export default function BarChart({ percentageData, description, borderColor, backgroundColor }: 
  { percentageData: Array<{ intent: string, percentage: number }>, description: string, borderColor: string, backgroundColor: string }) {
  
  const percentages = percentageData.map( pD => pD.percentage );
  const labels = percentageData.map( pD => pD.intent );

  const data = {
    labels,
    datasets: [
      {
        label: `${description}`,
        data: percentages,
        borderColor,
        fill: false,
        backgroundColor,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      x:{
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    },
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Top ${description} Themen`,
      },
      tooltip: {
        callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.x.toFixed(0)}%`
            }
        }
      }
    },
  };
  return <Bar options={options} data={data} />;
}
