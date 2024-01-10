import React, { FC, ReactNode } from 'react';
import './css/LoadingSpinner.css';

interface LoadingProps {
  children: ReactNode;
}

const Loading: FC<LoadingProps> = ({ children }) => {
  return (
    <div>
      <div className="spinner"></div>
      <div>{children}</div>;
    </div>
  );
};

export default Loading;
