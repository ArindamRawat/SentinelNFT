const NeonLoader = ({ color = 'purple' }) => {
  const glowColor = {
    purple: '#c770ff',
    orange: '#ff914d',
    green: '#69f0ae',
  }[color];

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
        style={{
          borderColor: `${glowColor} transparent ${glowColor} transparent`,
          boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
        }}
      ></div>
    </div>
  );
};

export default NeonLoader;
