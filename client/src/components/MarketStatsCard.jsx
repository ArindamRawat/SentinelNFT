import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function MarketStatsCard({ contract, blockchain }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewStats, setViewStats] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');
  const [sortBy, setSortBy] = useState('sales');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    if (!viewStats || !contract || !blockchain) return;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/api/v2/nft/collection/analytics?blockchain=${blockchain}&contract_address=${contract}&time_range=${timeRange}&sort_by=${sortBy}&sort_order=${sortOrder}`
        );
        const json = await res.json();
        if (res.ok) {
          setStats(json);
        } else {
          setError(json.message || 'Error fetching analytics');
        }
      } catch (err) {
        setError('Error fetching analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [viewStats, contract, blockchain, timeRange, sortBy, sortOrder]);

  const chartData = stats
    ? [
        { name: 'Volume', value: stats.total_volume },
        { name: 'Trades', value: stats.trade_count },
        { name: 'Assets', value: stats.asset_count },
        { name: 'Transfers', value: stats.transfer_count },
        { name: 'Txns', value: stats.transaction_count },
        { name: 'Floor USD', value: stats.floor_price_usd_count },
      ]
    : [];

  return (
    <div className="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-black via-[#0f0f2c] to-black border border-purple-800">
      <h2 className="text-xl font-bold text-purple-400 tracking-wide mb-4 drop-shadow-[0_0_5px_rgba(168,85,247,0.6)]">📈 Market Stats</h2>

      {!viewStats ? (
        <button
          onClick={() => setViewStats(true)}
          className="px-4 py-2 bg-purple-700 hover:bg-orange-500 text-white rounded-xl transition-all duration-300 shadow-lg"
        >
          View
        </button>
      ) : loading ? (
        <p className="text-purple-300 animate-pulse">Loading market stats...</p>
      ) : error ? (
        <div className="p-4 bg-red-900 text-red-300 border border-red-500 rounded-2xl shadow-md">
          <p>Error: {error}</p>
        </div>
      ) : stats ? (
        <>
          {/* Dropdown Filters */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Dropdown label="Time Range" value={timeRange} onChange={setTimeRange} options={['24h', '7d', '30d']} />
            <Dropdown label="Sort By" value={sortBy} onChange={setSortBy} options={['sales', 'volume']} />
            <Dropdown label="Sort Order" value={sortOrder} onChange={setSortOrder} options={['desc', 'asc']} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Stat label="Total Volume" value={stats.total_volume} />
            <Stat label="Total Trades" value={stats.trade_count} />
            <Stat label="Assets" value={stats.asset_count} />
            <Stat label="Transfers" value={stats.transfer_count} />
            <Stat label="Transactions" value={stats.transaction_count} />
            <Stat label="Floor Price in USD" value={stats.floor_price_usd_count} />
          </div>

          {/* Bar Chart */}
          <div className="mt-6">
            <h3 className="text-md font-semibold text-white mb-2">📊 Stat Overview</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#ffffff" tick={{ fontSize: 12 }} />
                <YAxis stroke="#ffffff" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e1e3f', border: '1px solid #8b5cf6', color: '#fff' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                />
                <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : null}
    </div>
  );
}

function Stat({ label, value }) {
  const num = Number(value);
  const display = !isNaN(num) ? num.toLocaleString() : 'N/A';

  return (
    <div className="flex flex-col bg-black/30 p-3 rounded-xl border border-purple-600 shadow-inner">
      <span className="text-xs text-purple-300">{label}</span>
      <span className="text-lg font-semibold text-white">{display}</span>
    </div>
  );
}

function Dropdown({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-purple-300 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl bg-black border border-purple-600 px-4 py-2 text-sm text-white shadow focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-black text-white">
            {opt.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MarketStatsCard;
