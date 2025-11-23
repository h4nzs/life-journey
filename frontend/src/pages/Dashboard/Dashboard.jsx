import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../../api/dashboard.api';
import { useAuthStore } from '../../store/auth.store';

import StatCard from './components/StatCard';
import InsightList from './components/InsightList';
import GoalProgress from './components/GoalProgress';

// Simple SVG Icons as components
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const JourneyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>;
const ObstacleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>;
const EmotionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const Dashboard = () => {
  const { user } = useAuthStore();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  });

  const stats = data?.data;

  // Skeleton Loader for Stat Cards
  const renderStatSkeletons = () => (
    [...Array(4)].map((_, i) => (
      <div key={i} className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 animate-pulse">
        <div className="flex items-center">
          <div className="p-3 rounded-full mr-4 bg-gray-200 h-12 w-12"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    ))
  );

  if (isError) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
        <h2 className="text-lg font-semibold text-red-700">Oops! Something went wrong.</h2>
        <p className="text-red-600 mt-1">{error.response?.data?.message || error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.email}!</h1>
        <p className="text-gray-600 mt-1">Here's a summary of your life journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? renderStatSkeletons() : (
          <>
            <StatCard title="Total Goals" value={stats?.totals?.tujuan ?? 0} icon={<TargetIcon />} colorClass="text-blue-600" />
            <StatCard title="Total Journeys" value={stats?.totals?.perjalanan ?? 0} icon={<JourneyIcon />} colorClass="text-green-600" />
            <StatCard title="Total Obstacles" value={stats?.totals?.rintangan ?? 0} icon={<ObstacleIcon />} colorClass="text-red-600" />
            <StatCard title="Total Emotions Logged" value={stats?.totals?.emosi ?? 0} icon={<EmotionIcon />} colorClass="text-purple-600" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InsightList
          title="Most Frequent Emotions"
          items={stats?.mostFrequentEmotions}
          emptyText="No emotion data available yet."
          renderItem={(emo, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
              <span className="text-gray-800 font-medium">{emo.jenis_emosi}</span>
              <span className="font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full text-sm">{emo._count.jenis_emosi}</span>
            </li>
          )}
        />
        <InsightList
          title="Most Dominant Obstacles"
          items={stats?.mostDominantRintangans}
          emptyText="No obstacle data available yet."
          renderItem={(rint, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
              <span className="text-gray-800 font-medium">{rint.jenis_rintangan}</span>
              <span className="font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full text-sm">{rint._count.jenis_rintangan}</span>
            </li>
          )}
        />
      </div>

      <GoalProgress goals={stats?.tujuanProgress} />
    </div>
  );
};

export default Dashboard;
