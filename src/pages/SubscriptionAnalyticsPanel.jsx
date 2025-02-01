import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { Plus, Edit, Users } from 'lucide-react';

const SubscriptionAnalyticsPanel = () => {
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [showAssignPlan, setShowAssignPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Sample data - replace with your actual data
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: 29,
      billing: "monthly",
      features: ["Up to 1,000 transactions", "Basic analytics", "Email support"],
      activeUsers: 245,
      status: "active"
    },
    {
      id: 2,
      name: "Professional",
      price: 99,
      billing: "monthly",
      features: ["Up to 10,000 transactions", "Advanced analytics", "Priority support"],
      activeUsers: 152,
      status: "active"
    },
    {
      id: 3,
      name: "Enterprise",
      price: 299,
      billing: "monthly",
      features: ["Unlimited transactions", "Custom analytics", "24/7 support"],
      activeUsers: 84,
      status: "active"
    }
  ];

  // Sample financial data
  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 30000, profit: 15000 },
    { month: 'Feb', revenue: 52000, expenses: 32000, profit: 20000 },
    { month: 'Mar', revenue: 61000, expenses: 35000, profit: 26000 },
    { month: 'Apr', revenue: 58000, expenses: 34000, profit: 24000 },
    { month: 'May', revenue: 63000, expenses: 36000, profit: 27000 },
    { month: 'Jun', revenue: 72000, expenses: 38000, profit: 34000 },
  ];

  const planDistribution = [
    { name: 'Basic', users: 245 },
    { name: 'Professional', users: 152 },
    { name: 'Enterprise', users: 84 },
  ];

  const PlanDetailsDialog = ({ plan }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{plan.name} Plan Details</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">Price</h3>
            <p>${plan.price}/{plan.billing}</p>
          </div>
          <div>
            <h3 className="font-medium">Active Users</h3>
            <p>{plan.activeUsers}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Features</h3>
          <ul className="list-disc pl-5">
            {plan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2">Usage Limits</h3>
          <div className="space-y-2">
            {plan.name === "Basic" && <p>1,000 monthly transactions</p>}
            {plan.name === "Professional" && <p>10,000 monthly transactions</p>}
            {plan.name === "Enterprise" && <p>Unlimited transactions</p>}
          </div>
        </div>
      </div>
    </DialogContent>
  );

  const AssignPlanDialog = () => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Assign Plan to User/Store</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">User/Store</label>
          <Input placeholder="Search user or store..." />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Select Plan</label>
          <div className="space-y-2">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <h4 className="font-medium">{plan.name}</h4>
                  <p className="text-sm text-gray-500">${plan.price}/{plan.billing}</p>
                </div>
                <Button variant="outline" size="sm">Select</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setShowAssignPlan(false)}>
          Cancel
        </Button>
        <Button>Assign Plan</Button>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="plans">
        <TabsList>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="analytics">Financial Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Subscription Plans</CardTitle>
              <div className="flex space-x-2">
                <Button onClick={() => setShowAssignPlan(true)}>
                  <Users className="w-4 h-4 mr-2" />
                  Assign Plan
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Billing</TableHead>
                    <TableHead>Active Users</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell>${plan.price}</TableCell>
                      <TableCell>{plan.billing}</TableCell>
                      <TableCell>{plan.activeUsers}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{plan.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedPlan(plan);
                              setShowPlanDetails(true);
                            }}
                          >
                            View Details
                          </Button>
                          <Button variant="outline" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                      <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
                      <Line type="monotone" dataKey="profit" stroke="#ffc658" name="Profit" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={planDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#8884d8" name="Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showPlanDetails} onOpenChange={setShowPlanDetails}>
        {selectedPlan && <PlanDetailsDialog plan={selectedPlan} />}
      </Dialog>

      <Dialog open={showAssignPlan} onOpenChange={setShowAssignPlan}>
        <AssignPlanDialog />
      </Dialog>
    </div>
  );
};

export default SubscriptionAnalyticsPanel;