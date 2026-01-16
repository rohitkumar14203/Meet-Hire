import React from 'react';
import { Outlet } from 'react-router-dom';
import { CandidateNavbar } from '../candidate/CandidateNavbar';

export const CandidateLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
