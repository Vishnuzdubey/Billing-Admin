import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Plus, Trash } from 'lucide-react';

const SettingsConfigurationPanel = () => {
  const [showApiKey, setShowApiKey] = useState(false);

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
  ];

  const billingCycles = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "annually", label: "Annually" },
  ];

  const notificationTemplates = [
    {
      id: 1,
      name: "Invoice Generated",
      type: "email",
      subject: "New Invoice #{invoice_number}",
      lastModified: "2025-02-01",
    },
    {
      id: 2,
      name: "Payment Reminder",
      type: "email",
      subject: "Payment Reminder for Invoice #{invoice_number}",
      lastModified: "2025-02-01",
    },
    {
      id: 3,
      name: "Payment Confirmation",
      type: "sms",
      subject: "Payment Received",
      lastModified: "2025-02-01",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure app-wide settings and defaults
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Currency Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Currency Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Default Currency</FormLabel>
                    <Select defaultValue="USD">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.name} ({currency.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Currency Display Format</FormLabel>
                    <Select defaultValue="symbol">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="symbol">Symbol ($100.00)</SelectItem>
                        <SelectItem value="code">Code (USD 100.00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>
              </div>

              {/* Tax Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tax Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Default Tax Rate (%)</FormLabel>
                    <Input type="number" placeholder="0.00" defaultValue="10.00" />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Tax Number Format</FormLabel>
                    <Input placeholder="TAX-{NUMBER}" defaultValue="TAX-{NUMBER}" />
                  </FormItem>
                </div>
              </div>

              {/* Billing Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Default Billing Cycle</FormLabel>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue placeholder="Select billing cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        {billingCycles.map((cycle) => (
                          <SelectItem key={cycle.value} value={cycle.value}>
                            {cycle.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Grace Period (Days)</FormLabel>
                    <Input type="number" placeholder="0" defaultValue="7" />
                  </FormItem>
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage notification templates and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Email Templates</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Template
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notificationTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {template.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{template.subject}</TableCell>
                      <TableCell>{template.lastModified}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Template</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this template? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Integration</CardTitle>
              <CardDescription>
                Configure payment processor settings and API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stripe Integration */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Stripe</h3>
                <div className="space-y-4">
                  <FormItem>
                    <FormLabel>API Key</FormLabel>
                    <div className="flex space-x-2">
                      <Input 
                        type={showApiKey ? "text" : "password"} 
                        placeholder="sk_test_..." 
                        className="flex-1"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Webhook Secret</FormLabel>
                    <Input type="password" placeholder="whsec_..." />
                  </FormItem>

                  <div className="flex items-center space-x-2">
                    <Switch id="test-mode" />
                    <label htmlFor="test-mode">Test Mode</label>
                  </div>
                </div>
              </div>

              {/* PayPal Integration */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">PayPal</h3>
                <div className="space-y-4">
                  <FormItem>
                    <FormLabel>Client ID</FormLabel>
                    <Input placeholder="Enter PayPal client ID" />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Client Secret</FormLabel>
                    <Input type="password" placeholder="Enter PayPal client secret" />
                  </FormItem>

                  <div className="flex items-center space-x-2">
                    <Switch id="sandbox-mode" />
                    <label htmlFor="sandbox-mode">Sandbox Mode</label>
                  </div>
                </div>
              </div>

              <Button>Save Payment Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsConfigurationPanel;