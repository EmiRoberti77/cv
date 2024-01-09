'use client';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Skills from './@skills/page';
import History from './@history/page';
import Profile from './@profile/page';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'Emiliano Roberti skills',
  description: 'Emiliano Roberti skills',
};

export default function SkillsLayout() {
  return (
    <div>
      <section className="py-6">
        <Profile />
      </section>
      <section className="flex gap-6">
        <Skills />
        <History />
      </section>
    </div>
  );
}
