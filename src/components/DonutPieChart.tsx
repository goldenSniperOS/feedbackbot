import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend , ChartOptions} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutPieChart(
  { positiveClassificationsLength, negativeClassificationsLength }: { positiveClassificationsLength: number, negativeClassificationsLength: number }
  ) {
	const data = {
		labels: ['Negative', 'Positive'],
		datasets: [
		{
			label: '# of Positive Reviews',
			data: [negativeClassificationsLength,positiveClassificationsLength],
			backgroundColor: [
				'rgba(192, 0, 0, 0.2)',
				'rgba(113, 173, 71, 0.2)'
			],
			borderColor: [
				'rgba(192, 0, 0, 1)',
				'rgba(113, 173, 71, 1)'
			],
			borderWidth: 5,
		},
		],
	};

	const options: ChartOptions<"doughnut"> = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: 'top',
			},
			title: {
				display: true,
				text: 'Stimmung der Kommentare'
			}
		}
	};
  	return <Doughnut options={options} data={data} />;
}
