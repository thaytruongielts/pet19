import React from 'react';

const SoundCloudPlayer: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 shadow-lg rounded-xl overflow-hidden bg-white">
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        title="PET Listening Audio"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2225455649&color=%233b82f6&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
      ></iframe>
    </div>
  );
};

export default SoundCloudPlayer;