import './globals.css';
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'NexusMind AI - Enterprise Autonomous Agent Platform',
  description: 'Design, build, deploy and monitor autonomous AI agents and visual workflows.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-950 text-slate-100 min-h-screen">
        <Sidebar />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="ml-64 p-8 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
