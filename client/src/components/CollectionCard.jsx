import React from 'react';

const CollectionCard = ({ metadata }) => {
  if (!metadata) return null;

  const {
    banner_image_url,
    image_url,
    collection,
    description,
    external_url,
    discord_url,
    instagram_url,
    marketplaces,
    slug_name
  } = metadata;

  const parsedMarketplaces = marketplaces ? JSON.parse(marketplaces) : {};

  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] border border-violet-500/40 shadow-xl rounded-2xl p-6 flex flex-col gap-4 text-white transition duration-300 hover:shadow-violet-500/50 hover:scale-[1.02]">
      <div className="flex items-center gap-4">
        {image_url && (
          <img
            src={image_url}
            alt="logo"
            className="w-16 h-16 rounded-md object-cover border border-purple-500 shadow-md"
          />
        )}
        <div>
          <h2 className="text-xl font-extrabold text-neon-purple drop-shadow">🚀 {collection}</h2>
          <p className="text-sm text-gray-300">{slug_name}</p>
        </div>
      </div>

      {banner_image_url && (
        <img
          src={banner_image_url}
          alt="banner"
          className="w-full h-40 object-cover rounded-lg border border-purple-600/50 shadow"
        />
      )}

      <p className="text-gray-300 text-sm">{description}</p>

      <div className="flex gap-4 flex-wrap mt-2 text-sm">
        {external_url && (
          <a
            href={external_url}
            target="_blank"
            className="text-neon-orange hover:underline transition"
          >
            🌐 Website
          </a>
        )}
        {discord_url && (
          <a
            href={discord_url}
            target="_blank"
            className="text-blue-400 hover:underline transition"
          >
            💬 Discord
          </a>
        )}
        {instagram_url && (
          <a
            href={instagram_url}
            target="_blank"
            className="text-pink-400 hover:underline transition"
          >
            📷 Instagram
          </a>
        )}
        {parsedMarketplaces?.marketplace_url && (
          <a
            href={parsedMarketplaces.marketplace_url}
            target="_blank"
            className="text-green-400 hover:underline transition"
          >
            🏪 {parsedMarketplaces.marketplace}
          </a>
        )}
      </div>
    </div>
  );
};

export default CollectionCard;
