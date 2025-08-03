import React, { useState } from 'react';

function RiskProfileCard({ profileData }) {
  const [riskPrediction, setRiskPrediction] = useState(null);
  const [showRisk, setShowRisk] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRiskPrediction = async () => {
    if (!profileData) return;

    const features = {
      loss_making_trades: profileData.loss_making_trades,
      avg_loss_making_trades: profileData.avg_loss_making_trades,
      loss_making_trades_percentage: profileData.loss_making_trades_percentage,
      loss_making_volume: profileData.loss_making_volume,
      diamond_hands: profileData.diamond_hands,
      liquidity_score: profileData.liquidity_score,
    };

    setLoading(true);
    try {
      const response = await fetch('https://risk-analysis-ai-model.onrender.com/risk-predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(features),
      });

      const result = await response.json();
      setRiskPrediction(result.risk_category || 'Unknown');
    } catch (error) {
      console.error('Risk prediction failed:', error);
      setRiskPrediction('Error');
    }
    setLoading(false);
  };

  const handleViewClick = () => {
    setShowRisk(true);
    if (!riskPrediction && profileData) {
      fetchRiskPrediction();
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-zinc-900 to-purple-950 border border-purple-700/40 rounded-2xl p-5 shadow-[0_0_20px_rgba(168,85,247,0.4)] backdrop-blur-md transition duration-500">
      <h2 className="text-lg font-bold text-purple-400 mb-4 tracking-wide">
        📊 Risk Profile
      </h2>

      {!showRisk ? (
        <button
          onClick={handleViewClick}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 shadow-md hover:shadow-purple-500/40 transition duration-300"
        >
          View Risk Profile
        </button>
      ) : loading ? (
        <p className="text-sm text-purple-300">🔄 Analyzing risk factors...</p>
      ) : (
        <>
          <p
            className={`text-2xl font-extrabold tracking-wide ${
              riskPrediction === 'High'
                ? 'text-red-500'
                : riskPrediction === 'Medium'
                ? 'text-yellow-400'
                : 'text-green-400'
            }`}
          >
            {riskPrediction}
          </p>
          <p className="text-sm text-purple-300 mt-2">
            Based on trade losses, diamond hands, and liquidity score.
          </p>
        </>
      )}
    </div>
  );
}

export default RiskProfileCard;
