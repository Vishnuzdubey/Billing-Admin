import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertTriangle,
  Search,
  Shield,
  MessageSquare,
  ThumbsUp,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const AuditSupportPanel = () => {
  const [selectedLogType, setSelectedLogType] = useState("all");
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Sample data - replace with your actual data
  const auditLogs = [
    {
      id: "LOG-001",
      timestamp: "2025-02-02 14:30:22",
      user: "admin@example.com",
      action: "LOGIN_SUCCESS",
      details: "Successful login from IP 192.168.1.1",
      severity: "info"
    },
    {
      id: "LOG-002",
      timestamp: "2025-02-02 14:35:10",
      user: "unknown",
      action: "LOGIN_FAILED",
      details: "Failed login attempt from IP 192.168.1.100",
      severity: "warning"
    },
    {
      id: "LOG-003",
      timestamp: "2025-02-02 14:40:05",
      user: "john@example.com",
      action: "DATA_MODIFIED",
      details: "Modified user profile settings",
      severity: "info"
    },
    {
      id: "LOG-004",
      timestamp: "2025-02-02 14:45:00",
      user: "unknown",
      action: "SUSPICIOUS_ACTIVITY",
      details: "Multiple failed login attempts detected",
      severity: "critical"
    }
  ];

  const supportTickets = [
    {
      id: "TICKET-001",
      user: "john@example.com",
      subject: "Payment Issue",
      status: "open",
      priority: "high",
      created: "2025-02-02 10:30:00",
      lastUpdate: "2025-02-02 14:30:00",
      messages: [
        {
          sender: "john@example.com",
          message: "I'm unable to process payments on my account",
          timestamp: "2025-02-02 10:30:00"
        },
        {
          sender: "support",
          message: "We're looking into this issue. Could you provide more details?",
          timestamp: "2025-02-02 14:30:00"
        }
      ]
    },
    {
      id: "TICKET-002",
      user: "jane@example.com",
      subject: "Account Access",
      status: "closed",
      priority: "medium",
      created: "2025-02-01 15:20:00",
      lastUpdate: "2025-02-02 09:15:00",
      messages: [
        {
          sender: "jane@example.com",
          message: "I can't access my account dashboard",
          timestamp: "2025-02-01 15:20:00"
        }
      ]
    }
  ];

  const feedback = [
    {
      id: "FB-001",
      user: "mike@example.com",
      rating: 4,
      comment: "Great platform, but could use more reporting features",
      date: "2025-02-02"
    },
    {
      id: "FB-002",
      user: "sarah@example.com",
      rating: 5,
      comment: "Excellent support team and quick response times",
      date: "2025-02-01"
    }
  ];

  const getLogSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const SecurityAlerts = () => (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Critical Security Alert</AlertTitle>
        <AlertDescription>
          Multiple failed login attempts detected from IP 192.168.1.100
        </AlertDescription>
      </Alert>
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Security Notice</AlertTitle>
        <AlertDescription>
          New device logged in from unknown location
        </AlertDescription>
      </Alert>
    </div>
  );

  const TicketDetails = ({ ticket }) => (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Ticket #{ticket.id}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Status</p>
            <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
              {ticket.status.toUpperCase()}
            </Badge>
          </div>
          <div>
            <p className="font-medium">Priority</p>
            <Badge variant={ticket.priority === 'high' ? 'destructive' : 'default'}>
              {ticket.priority.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            {ticket.messages.map((message, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{message.sender}</span>
                  <span>{message.timestamp}</span>
                </div>
                <p className="mt-1">{message.message}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Textarea placeholder="Type your response..." />
            <Button className="w-full">Send Response</Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="audit">
        <TabsList>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="security">Security Monitoring</TabsTrigger>
          <TabsTrigger value="support">Support & Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>System Audit Logs</CardTitle>
              <CardDescription>Track all actions performed within the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Select value={selectedLogType} onValueChange={setSelectedLogType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Logs</SelectItem>
                    <SelectItem value="login">Login Activity</SelectItem>
                    <SelectItem value="data">Data Changes</SelectItem>
                    <SelectItem value="security">Security Events</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-1">
                  <Input placeholder="Search logs..." />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>
                        <Badge className={getLogSeverityColor(log.severity)}>
                          {log.severity.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <SecurityAlerts />
            
            <Card>
              <CardHeader>
                <CardTitle>Login Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2025-02-02 14:30:22</TableCell>
                      <TableCell>192.168.1.1</TableCell>
                      <TableCell>
                        <Badge variant="success">Success</Badge>
                      </TableCell>
                      <TableCell>New York, US</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2025-02-02 14:35:10</TableCell>
                      <TableCell>192.168.1.100</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Failed</Badge>
                      </TableCell>
                      <TableCell>Unknown</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Last Update</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{ticket.user}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
                            {ticket.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={ticket.priority === 'high' ? 'destructive' : 'default'}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{ticket.lastUpdate}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowTicketDetails(true);
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{item.user}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span>{item.rating}/5</span>
                        </div>
                      </div>
                      <p>{item.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showTicketDetails} onOpenChange={setShowTicketDetails}>
        {selectedTicket && <TicketDetails ticket={selectedTicket} />}
      </Dialog>
    </div>
  );
};

export default AuditSupportPanel;