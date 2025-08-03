import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ScoreMetricsCard = ({ scores, timeRange, sortOrder, onParamsChange }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!showDetails) {
    return (
      <div className="bg-gradient-to-br from-black via-zinc-900 to-black rounded-2xl p-6 shadow-purple-md border border-purple-500 animate-pulse-once animate-glow">
        <h2 className="text-lg font-semibold text-purple-400 mb-2">Score Metrics</h2>
        <button
          onClick={() => setShowDetails(true)}
          className="px-4 py-2 bg-purple-700 text-white text-sm rounded hover:bg-purple-800 transition shadow-md hover:shadow-purple-600"
        >
          View
        </button>
      </div>
    );
  }

  if (!scores) {
    return (
      <div className="bg-gradient-to-br from-black via-zinc-900 to-black text-red-500 border border-red-400 rounded-xl shadow-md p-6">
        Score Metrics: No scores available.
      </div>
    );
  }

  const {
    marketcap = 0,
    price_avg = 0,
    price_ceiling = 0,
    price_avg_change = 0,
    marketcap_change = 0,
  } = scores || {};

  const chartData = [
    { name: 'Market Cap', value: Number(marketcap) },
    { name: 'Avg Price', value: Number(price_avg) },
    { name: 'Ceiling Price', value: Number(price_ceiling) },
    { name: 'Price Change %', value: Number(price_avg_change) * 100 },
    { name: 'MarketCap Change %', value: Number(marketcap_change) * 100 },
  ];

  return (
    <div className="bg-gradient-to-br from-black via-zinc-900 to-black border border-purple-600 shadow-purple-md rounded-2xl p-6 flex flex-col gap-4 animate-glow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-purple-400">Score Metrics</h2>

        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => onParamsChange({ timeRange: e.target.value })}
            className="text-sm border border-purple-500 text-white bg-black rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
          >
            <option value="24h">24h</option>
            <option value="7d">7d</option>
            <option value="30d">30d</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => onParamsChange({ sortOrder: e.target.value })}
            className="text-sm border border-purple-500 text-white bg-black rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      {/* Metrics */}
      {[
        ['Market Cap', `$${Number(marketcap).toLocaleString()}`],
        ['Average Price', `$${Number(price_avg).toFixed(2)}`],
        ['Price Ceiling', `$${Number(price_ceiling).toFixed(2)}`],
        ['Price Change', `${(price_avg_change * 100).toFixed(2)}%`],
        ['MarketCap Change', `${(marketcap_change * 100).toFixed(2)}%`],
      ].map(([label, value], i) => (
        <div
          key={i}
          className="flex justify-between text-sm border-b border-zinc-700 py-1 text-white"
        >
          <span className="text-purple-400">{label}</span>
          <span className="font-medium text-white">{value}</span>
        </div>
      ))}

      {/* Chart */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-purple-300 mb-2">Overview Chart</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#fff' }} />
            <YAxis tick={{ fontSize: 12, fill: '#fff' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#a855f7' }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreMetricsCard;
