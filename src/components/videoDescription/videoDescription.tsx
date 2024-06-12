import React, { useState } from 'react';

const VideoDescription: React.FC<{ description: string }> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <p className={`text-titleText ${expanded ? 'expanded' : ''}`}>
        {description}
      </p>
      <button className='text-white' onClick={toggleDescription}>
        {expanded ? 'скрыть' : '...ещё'}
      </button>
    </div>
  );
};

export default VideoDescription;
