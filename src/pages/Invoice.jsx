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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, FileEdit, Eye } from 'lucide-react';

const Invoice = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Sample data - replace with your actual data
  const invoices = [
    {
      id: "INV-001",
      user: "John Doe",
      store: "Store A",
      amount: 1500,
      status: "paid",
      dueDate: "2025-02-15",
      items: [
        { description: "Service A", amount: 1000 },
        { description: "Service B", amount: 500 },
      ]
    },
    {
      id: "INV-002",
      user: "Jane Smith",
      store: "Store B",
      amount: 2500,
      status: "unpaid",
      dueDate: "2025-02-20",
      items: [
        { description: "Service C", amount: 2500 },
      ]
    },
    {
      id: "INV-003",
      user: "Mike Johnson",
      store: "Store C",
      amount: 3500,
      status: "overdue",
      dueDate: "2025-01-15",
      items: [
        { description: "Service D", amount: 2000 },
        { description: "Service E", amount: 1500 },
      ]
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'unpaid':
        return 'bg-yellow-500';
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredInvoices = selectedStatus === "all" 
    ? invoices 
    : invoices.filter(invoice => invoice.status === selectedStatus);

  const InvoiceDetails = ({ invoice }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-medium">User:</p>
          <p>{invoice.user}</p>
        </div>
        <div>
          <p className="font-medium">Store:</p>
          <p>{invoice.store}</p>
        </div>
        <div>
          <p className="font-medium">Due Date:</p>
          <p>{invoice.dueDate}</p>
        </div>
        <div>
          <p className="font-medium">Status:</p>
          <Badge className={getStatusColor(invoice.status)}>
            {invoice.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-medium mb-2">Line Items:</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">Rs {item.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <p className="font-medium">Total Amount: Rs {invoice.amount}</p>
      </div>
    </div>
  );

  const CreateInvoiceForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">User</label>
          <Input placeholder="Enter user name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Store</label>
          <Input placeholder="Enter store name" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <Input type="date" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Line Items</label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input placeholder="Description" className="flex-grow" />
            <Input placeholder="Amount" type="number" className="w-32" />
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Line Item
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={() => setShowCreateInvoice(false)}>
          Cancel
        </Button>
        <Button>Create Invoice</Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Billing & Invoices</CardTitle>
          <Button onClick={() => setShowCreateInvoice(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Invoices</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.user}</TableCell>
                  <TableCell>{invoice.store}</TableCell>
                  <TableCell>Rs {invoice.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowInvoiceDetails(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FileEdit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showInvoiceDetails} onOpenChange={setShowInvoiceDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invoice Details - {selectedInvoice?.id}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && <InvoiceDetails invoice={selectedInvoice} />}
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateInvoice} onOpenChange={setShowCreateInvoice}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          <CreateInvoiceForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Invoice;