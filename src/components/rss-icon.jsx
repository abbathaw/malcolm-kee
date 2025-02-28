import React from 'react';

export const RssIcon = ({ width = 30, height = width, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-label="RSS"
    role="img"
    viewBox="0 0 512 512"
    width={width}
    height={height}
    className={className}
  >
    <rect width="512" height="512" rx="15%" fill="#f80" />
    <circle cx="145" cy="367" r="35" fill="#fff" />
    <path
      fill="none"
      stroke="#fff"
      strokeWidth="60"
      d="M109 241c89 0 162 73 162 162M109 127c152 0 276 124 276 276"
    />
  </svg>
);
