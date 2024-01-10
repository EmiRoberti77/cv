import React, { FC, ReactNode } from 'react';

interface ErrorProps {
  children: ReactNode;
}

const Error: FC<ErrorProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Error;
