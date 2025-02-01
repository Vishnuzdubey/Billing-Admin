import React, { useState } from 'react';
import { Search, Filter, MoreVertical, UserCheck, UserX, Key, Edit, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active", subscription: "premium" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", subscription: "basic" }
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', status: 'active', subscription: 'basic' });

  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setIsDialogOpen(false);
    setNewUser({ name: '', email: '', status: 'active', subscription: 'basic' });
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl">User Management</CardTitle>
          <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
            <Plus size={18} /> Add User
          </Button>
        </CardHeader>

        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input placeholder="Search users..." className="max-w-sm" />
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} /> Filter
            </Button>
          </div>

          <table className="w-full border rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Subscription</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 capitalize">{user.status}</td>
                  <td className="p-2 capitalize">{user.subscription}</td>
                  <td className="p-2 text-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      {user.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <Input
              placeholder="Full Name"
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
