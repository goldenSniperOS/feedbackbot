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
import { MessageClassification } from '@/types/message';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ classifications, description }: { classifications: MessageClassification[], description: string }) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: description,
      },
    },
  };
  let datesLabels: string[]= [];
  let datesSum: number[] = [];

  classifications.forEach(c => {
    const dateObject = new Date(c.date);
    const dateString = dateObject.toLocaleDateString('de-DE', { year:"numeric", month:"short"});
    
    const searchIndex = datesLabels.indexOf(dateString);
    if (searchIndex === -1) {
      datesLabels.push(dateString);
      datesSum.push(1);
    } else {
      datesSum[searchIndex] = datesSum[searchIndex] + 1;
    }
  });

  const data = {
    labels: datesLabels.reverse(),
    datasets: [
      {
        label: 'Dataset 1',
        data: datesSum,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return <Line options={options} data={data} />;
}
