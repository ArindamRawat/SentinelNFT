import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import CollectionCard from './CollectionCard';
import ScoreMetricsCard from './ScoreMetricsCard';
import MarketStatsCard from './MarketStatsCard';
import TrendGraph from './TrendGraph';
import RiskProfileCard from './RiskProfileCard';
import AnomalyDetectionCard from './AnomalyDetectionCard';
import HolderStatsCard from './HolderStatsCard';
import ScoreSummaryCard from './ScoreSummaryCard';
import ExpertInsightCard from './ExpertInsightCard';
import CyberpunkLoader from './CyberpunkLoader';
import CyberpunkSkeletonCard from './CyberpunkSkeletonCard'; 

import './Dashboard.css';

function App() {
  const [searchData, setSearchData] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [scores, setScores] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [profile, setProfile] = useState(null);

  const [timeRange, setTimeRange] = useState('24h');
  const [sortOrder, setSortOrder] = useState('desc');

  const [initialLoading, setInitialLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const fetchScores = async ({ contract, blockchain, timeRange, sortOrder }) => {
    try {
      const scoresRes = await fetch(
        `/api/api/v2/nft/collection/scores?blockchain=${blockchain}&contract_address=${contract}&time_range=${timeRange}&offset=0&limit=30&sort_by=marketcap&sort_order=${sortOrder}`
      );

      const scoresJson = await scoresRes.json();
      if (scoresJson.data && scoresJson.data.length > 0) {
        setScores(scoresJson.data[0]);
      } else {
        setScores(null);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error fetching scores:', error);
      setScores(null);
    }
  };

  const fetchAnalytics = async ({ contract, blockchain }) => {
    try {
      const analyticsRes = await fetch(
        `/api/api/v2/nft/collection/analytics?blockchain=${blockchain}&contract_address=${contract}`
      );
      const analyticsJson = await analyticsRes.json();
      setAnalytics(analyticsJson);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalytics(null);
    }
  };

  const handleSearch = async ({ contract, blockchain }) => {
    setIsSearching(true);
    setSearchData({ contract, blockchain });
    setMetadata(null);
    setScores(null);
    setAnalytics(null);
    setProfile(null);

    try {
      const metadataRes = await fetch(
        `/api/api/v2/nft/collection/metadata?blockchain=${blockchain}&contract_address=${contract}`
      );
      const metadataJson = await metadataRes.json();

      if (metadataJson.data && metadataJson.data.length > 0) {
        setMetadata(metadataJson.data[0]);
      } else {
        setMetadata(null);
      }

      await fetchScores({ contract, blockchain, timeRange, sortOrder });
      await fetchAnalytics({ contract, blockchain });

      const profileRes = await fetch(
        `/api/api/v2/nft/collection/profile?blockchain=${blockchain}&contract_address=${contract}`
      );
      const profileJson = await profileRes.json();
      setProfile(profileJson);
    } catch (error) {
      console.error('Error fetching metadata or profile:', error);
      setMetadata(null);
      setProfile(null);
    }

    setIsSearching(false);
  };

  const handleParamChange = ({ timeRange: tr, sortOrder: so }) => {
    if (!searchData) return;

    if (tr) setTimeRange(tr);
    if (so) setSortOrder(so);

    fetchScores({
      contract: searchData.contract,
      blockchain: searchData.blockchain,
      timeRange: tr || timeRange,
      sortOrder: so || sortOrder,
    });
  };

  if (initialLoading) {
    return <CyberpunkLoader />;
  }

  return (
    <div
  className="min-h-screen w-full p-6 relative neon-bg"
  style={{
    background: 'linear-gradient(135deg, #0d0d0d, #1a1a1a)',
    backgroundAttachment: 'fixed',
    fontFamily: "'Orbitron', sans-serif",
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  }}
>

      <style>
  {`
    body {
      margin: 0;
      padding: 0;
    }

    .neon-bg {
      position: relative;
      z-index: 0;
    }

    .neon-bg::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at center, rgba(255, 0, 255, 0.08), transparent 70%),
                  radial-gradient(circle at top right, rgba(255, 102, 0, 0.07), transparent 70%),
                  radial-gradient(circle at bottom left, rgba(0, 255, 204, 0.07), transparent 70%);
      animation: pulse 6s ease-in-out infinite;
      z-index: -1; /* Push behind other content */
      pointer-events: none; /* ✅ Ensures it doesn't block clicks */
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.02);
        opacity: 0.9;
      }
    }
  `}
</style>



      <h1 className="text-4xl font-bold mb-6 text-center text-purple-400 drop-shadow-[0_0_8px_#a020f0]">
        SentinelNFT Intelligence Dashboard
      </h1>

      <SearchBar onSearch={handleSearch} />

      {isSearching ? (
        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CyberpunkSkeletonCard color="purple" />
            <CyberpunkSkeletonCard color="orange" />
            <CyberpunkSkeletonCard color="green" />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CyberpunkSkeletonCard color="orange" />
            <CyberpunkSkeletonCard color="green" />
            <CyberpunkSkeletonCard color="purple" />
          </div>
          <div className="mt-8">
            <CyberpunkSkeletonCard color="green" />
          </div>
          <div className="mt-6">
            <CyberpunkSkeletonCard color="orange" />
          </div>
          <div className="mt-6">
            <CyberpunkSkeletonCard color="purple" />
          </div>
        </>
      ) : searchData && metadata && profile ? (
        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CollectionCard metadata={metadata} />
            <ScoreMetricsCard
              scores={scores}
              timeRange={timeRange}
              sortOrder={sortOrder}
              onParamsChange={handleParamChange}
            />
            <MarketStatsCard
              contract={searchData.contract}
              blockchain={searchData.blockchain}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RiskProfileCard profileData={profile} />
            <AnomalyDetectionCard profileData={profile} />
            <ScoreSummaryCard
              blockchain={searchData.blockchain}
              contractAddress={searchData.contract}
            />
          </div>

          <div className="mt-8">
            <TrendGraph
              contractAddress={searchData.contract}
              blockchain={searchData.blockchain}
            />
          </div>

          <div className="mt-6">
            <HolderStatsCard
              contract={searchData.contract}
              blockchain={searchData.blockchain}
            />
          </div>

          <div className="mt-6">
            <ExpertInsightCard
              blockchain={searchData.blockchain}
              contractAddress={searchData.contract}
            />
          </div>
        </>
      ) : (
        <div className="h-[70vh] flex items-center justify-center text-xl text-center px-4 text-[#00ffcc] drop-shadow-[0_0_6px_#00ffcc]">
          Search for a collection to begin exploring insights.
          <br />
          Cards will load once core metadata and profile data are available.
        </div>
      )}
    </div>
  );
}

export default App;
