'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface TanstackProps {
  children: React.ReactNode;
  skills: React.ReactNode;
  history: React.ReactNode;
}
const TanstackProvider = ({ props }: { props: TanstackProps }) => {
  const { children, skills, history } = props;
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <section className="py-6">{children}</section>
      <section className="flex gap-6">
        {skills}
        {history}
      </section>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
