import React from 'react';
import { Users, UserCheck, Store, Folder, ShoppingBag } from 'lucide-react';
import { DashboardStats as DashboardStatsType } from '../types';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  trend: number;
}

const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</h3>
      </div>
      <div className="w-12 h-12 rounded-lg bg-[#DD2B2B]/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#DD2B2B]" />
      </div>
    </div>
    <div className="mt-4">
      <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend >= 0 ? '+' : ''}{trend}%
      </span>
      <span className="text-sm text-gray-500 ml-1">vs last month</span>
    </div>
  </div>
);

const StatsGrid = ({ stats }: { stats: DashboardStatsType }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard
        title="Total Users"
        value={stats.totalUsers}
        icon={Users}
        trend={12}
      />
      <StatsCard
        title="Active Users"
        value={stats.activeUsers}
        icon={UserCheck}
        trend={8}
      />
      <StatsCard
        title="Service Providers"
        value={stats.activeProviders}
        icon={Store}
        trend={15}
      />
      <StatsCard
        title="Pending Providers"
        value={stats.pendingProviders}
        icon={Store}
        trend={-5}
      />
      <StatsCard
        title="Total Services"
        value={stats.totalServices}
        icon={ShoppingBag}
        trend={20}
      />
      <StatsCard
        title="Categories"
        value={stats.totalCategories}
        icon={Folder}
        trend={3}
      />
    </div>
  );
};

export default StatsGrid;