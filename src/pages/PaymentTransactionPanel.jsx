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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, RefreshCw, ArrowLeftRight, Search } from 'lucide-react';

const PaymentsTransactionsPanel = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showReconciliation, setShowReconciliation] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sample data - replace with your actual data
  const transactions = [
    {
      id: "TXN-001",
      date: "2025-02-01",
      user: "John Doe",
      amount: 1500,
      status: "completed",
      invoiceId: "INV-001",
      paymentMethod: "Credit Card",
      reconciled: true
    },
    {
      id: "TXN-002",
      date: "2025-02-02",
      user: "Jane Smith",
      amount: 2500,
      status: "pending",
      invoiceId: "INV-002",
      paymentMethod: "Bank Transfer",
      reconciled: false
    },
    {
      id: "TXN-003",
      date: "2025-02-03",
      user: "Mike Johnson",
      amount: 3500,
      status: "failed",
      invoiceId: "INV-003",
      paymentMethod: "PayPal",
      reconciled: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus;
    // Add date filtering logic here when implementing
    return matchesStatus;
  });

  const ReconciliationDialog = () => (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Payment Reconciliation</DialogTitle>
        <DialogDescription>
          Match payments with invoices and verify transaction details
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex gap-4 mb-4">
          <Input placeholder="Search by transaction ID or invoice ID" className="flex-1" />
          <Button>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reconciled</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.invoiceId}</TableCell>
                <TableCell>${transaction.amount}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {transaction.reconciled ? "✓" : "—"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={transaction.reconciled}
                  >
                    <ArrowLeftRight className="w-4 h-4 mr-2" />
                    Reconcile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  );

  const RefundDialog = ({ transaction }) => (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Process Refund</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to process a refund for transaction {transaction.id}?
          This will refund ${transaction.amount} to {transaction.user}.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="space-y-4 py-4">
        <div>
          <label className="block text-sm font-medium mb-1">Refund Amount</label>
          <Input type="number" defaultValue={transaction.amount} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Reason for Refund</label>
          <Input placeholder="Enter reason for refund" />
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Process Refund</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Payments & Transactions</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={() => setShowReconciliation(true)}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Payment Reconciliation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDateRange ? 
                    format(selectedDateRange, "PPP") :
                    "Pick a date"
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDateRange}
                  onSelect={setSelectedDateRange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.invoiceId}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowRefundDialog(true);
                      }}
                      disabled={transaction.status !== 'completed'}
                    >
                      Refund
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showReconciliation} onOpenChange={setShowReconciliation}>
        <ReconciliationDialog />
      </Dialog>

      <AlertDialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        {selectedTransaction && <RefundDialog transaction={selectedTransaction} />}
      </AlertDialog>
    </div>
  );
};

export default PaymentsTransactionsPanel;