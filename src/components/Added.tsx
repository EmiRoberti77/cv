import React, { FC } from 'react';

interface AddedProps {
  children: React.ReactNode;
  title: string;
}

const Added: FC<AddedProps> = ({ children, title }) => {
  return (
    <div>
      <div>Added {title}</div>
      {children}
    </div>
  );
};

export default Added;
