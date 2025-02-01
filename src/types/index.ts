export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  pendingProviders: number;
  activeProviders: number;
  totalServices: number;
  totalCategories: number;
}

export interface ChartData {
  date: string;
  users: number;
  providers: number;
}