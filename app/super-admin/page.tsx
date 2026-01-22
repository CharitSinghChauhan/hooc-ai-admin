"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers, updateUserRole } from "@/lib/axios";
import { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type User = {
  _id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
};

export default function AdminPage() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data.users);
      setError("");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message ?? "Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user,
        ),
      );
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message ?? "Failed to update role");
      console.error("Error updating role:", err);
    }
  };

  const getRoleVariant = (role: string) => {
    console.log(role)
    switch (role) {
      case "super_admin":
        return "destructive";
      case "admin":
        return "default";
      case "user":
      default:
        return "secondary";
    }
  };

  if (loading) return <div className="p-8">Loading users...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="rounded-">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Change Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`${user.picture}`}
                          alt="user-profile"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(role) => handleRoleChange(user._id, role)}
                    >
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup>
                          <SelectItem value="user">user</SelectItem>
                          <SelectItem value="admin">admin</SelectItem>
                          <SelectItem value="super_admin">
                            super_admin
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
