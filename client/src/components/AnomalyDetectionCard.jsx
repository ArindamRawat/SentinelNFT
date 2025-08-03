import React, { useState } from 'react';
import { motion } from 'framer-motion';

function AnomalyDetectionCard({ profileData }) {
  const [anomalyPrediction, setAnomalyPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const fetchAnomalyPrediction = async () => {
    if (!profileData) return;

    setLoading(true);

    const features = {
      washtrade_index: profileData.washtrade_index,
      zero_profit_trades: profileData.zero_profit_trades,
      loss_making_volume: profileData.loss_making_volume,
    };

    try {
      const response = await fetch('https://risk-analysis-ai-model.onrender.com/anomaly-predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(features),
      });

      const result = await response.json();
      setAnomalyPrediction(result.prediction || 'Unknown');
    } catch (error) {
      console.error('Anomaly prediction failed:', error);
      setAnomalyPrediction('Error');
    }

    setLoading(false);
  };

  const handleViewClick = () => {
    setShowDetails(true);
    if (!anomalyPrediction && profileData) {
      fetchAnomalyPrediction();
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-black via-[#1a0025] to-black border border-purple-600 rounded-2xl p-5 shadow-[0_0_20px_rgba(168,85,247,0.4)] backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-xl font-bold text-purple-400 mb-4 tracking-wide">🚨 Anomaly Detection</h2>

      {!showDetails ? (
        <motion.button
          onClick={handleViewClick}
          whileHover={{ scale: 1.05, boxShadow: '0 0 10px red' }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 text-white px-5 py-2 rounded-md font-semibold transition hover:bg-red-700"
        >
          View Insight
        </motion.button>
      ) : loading ? (
        <p className="text-purple-300 animate-pulse text-sm">🧠 Analyzing for anomalies...</p>
      ) : (
        <>
          <p
            className={`text-2xl font-extrabold drop-shadow ${
              anomalyPrediction === 'Anomalous'
                ? 'text-red-500'
                : anomalyPrediction === 'Suspicious'
                ? 'text-yellow-400'
                : 'text-green-400'
            }`}
          >
            {anomalyPrediction}
          </p>
          <p className="text-sm text-purple-200 mt-3 font-medium">
            Evaluates wash trades and zero-profit behaviors for anomalies.
          </p>
        </>
      )}
    </motion.div>
  );
}

export default AnomalyDetectionCard;
