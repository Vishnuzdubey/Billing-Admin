import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, UserCheck, UserX, Key, Edit, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { useToast } from "@/components/ui/use-toast";

const API_BASE_URL = 'http://localhost:5000/api/v1/admin';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullname: '',
    username: '',
    password: '',
    phone: '',
    store_limit: 2
  });
  // const { toast } = useToast();

  // Fetch users on component mount
  useEffect(() => {

    console.log("Hello World")
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      let response = await fetch(`${API_BASE_URL}/users`, {
        method : "GET",
        headers: {
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoyLCJpYXQiOjE3Mzg1MTQ2ODgsImV4cCI6MTczOTExOTQ4OH0.inij18WjLvjbDrYsD04b1uNb95qbz__wLRxVWfZfJUQ", 
        }
      });
      // response = await response.json();
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log(data);

      setUsers(data || []); // Adjust based on your API response structure
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to fetch users",
      //   variant: "destructive"
      // });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoyLCJpYXQiOjE3Mzg1MTQ2ODgsImV4cCI6MTczOTExOTQ4OH0.inij18WjLvjbDrYsD04b1uNb95qbz__wLRxVWfZfJUQ",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      // Refresh user list
      await fetchUsers();
      setIsDialogOpen(false);
      setNewUser({
        fullname: '',
        username: '',
        password: '',
        phone: '',
        store_limit: 2
      });
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to create user",
      //   variant: "destructive"
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl">User Management</CardTitle>
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            className="flex items-center gap-2"
            disabled={isLoading}
          >
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

          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <table className="w-full border rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Username</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Store Limit</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-t">
                    <td className="p-2">{user.fullname}</td>
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.phone}</td>
                    <td className="p-2">{user.store_limit}</td>
                    <td className="p-2 text-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
              value={newUser.fullname}
              onChange={e => setNewUser({ ...newUser, fullname: e.target.value })}
            />
            <Input
              placeholder="Username"
              value={newUser.username}
              onChange={e => setNewUser({ ...newUser, username: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={newUser.phone}
              onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Store Limit"
              value={newUser.store_limit}
              onChange={e => setNewUser({ ...newUser, store_limit: parseInt(e.target.value) || 2})}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleAddUser} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Add User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}