import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PromoUsageChartProps {
  data: {
    name: string;
    usagePercent: number;
  }[];
}

// Sample data
const samplePromoData = [
  { name: 'Promo A', usagePercent: 70 },
  { name: 'Promo B', usagePercent: 50 },
  { name: 'Promo C', usagePercent: 30 },
  { name: 'Promo D', usagePercent: 90 },
];

export const PromoUsagePieChart = ({ data }: PromoUsageChartProps) => {
  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: '% Users Used',
        data: data.map((d) => d.usagePercent),
        backgroundColor: [
          '#3b82f6', // blue
          '#facc15', // yellow
          '#22c55e', // green
          '#ef4444', // red
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Most Used Promos</h2>
      <Pie data={chartData} />
    </div>
  );
};

// Usage example with sample data
export const PromoDistributionCard = () => {
  return <PromoUsagePieChart data={samplePromoData} />;
};