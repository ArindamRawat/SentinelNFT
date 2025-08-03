import NeonLoader from './NeonLoader';

const CyberpunkSkeletonCard = ({ color = 'purple' }) => {
  return (
    <div className="rounded-2xl bg-[rgba(255,255,255,0.05)] p-6 shadow-inner backdrop-blur-md border border-[rgba(255,255,255,0.1)] hover:scale-[1.01] transition-all duration-300"
      style={{
        boxShadow: `0 0 20px ${color === 'purple' ? '#c770ff' : color === 'orange' ? '#ff914d' : '#69f0ae'}33`,
      }}
    >
      <NeonLoader color={color} />
    </div>
  );
};

export default CyberpunkSkeletonCard;
