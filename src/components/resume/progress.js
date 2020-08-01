import React from 'react';
import { useSelector } from 'react-redux';

const Progress = ({ percent, name }) => {
  const { direction } = useSelector(({ global }) => global);
  const ltr = direction === 'ltr';

  return (
    <div className="shadow w-full bg-neutral-200 rounded overflow-hidden mb-2">
      <div
        className="bg-primary-500 text-sm py-1 text-white font-light"
        style={{ width: `${percent}%` }}
      >
        <span className={`p${ltr ? 'l' : 'r'}-2`}>{name}</span>
      </div>
    </div>
  );
};

export default Progress;
