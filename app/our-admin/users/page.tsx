"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Users, Shield, User } from "lucide-react";

// Mock platform users data
const mockPlatformUsers = [
  {
    id: "user-001",
    name: "Emeka Okafor",
    email: "emeka@example.com",
    role: "project_owner",
    projects: 2,
    joinedAt: "2024-01-15",
    status: "active",
  },
  {
    id: "user-002",
    name: "Ngozi Adebayo",
    email: "ngozi@example.com",
    role: "project_owner",
    projects: 1,
    joinedAt: "2024-02-01",
    status: "active",
  },
  {
    id: "user-003",
    name: "Ibrahim Hassan",
    email: "ibrahim@example.com",
    role: "super_admin",
    projects: 0,
    joinedAt: "2023-12-01",
    status: "active",
  },
];

const roleConfig = {
  super_admin: { label: "Super Admin", variant: "default" as const, icon: Shield },
  project_owner: { label: "Project Owner", variant: "secondary" as const, icon: User },
};

export default function PlatformUsers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockPlatformUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-6xl p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Platform Users</h1>
        <p className="mt-1 text-muted-foreground">
          Manage project owners and platform administrators
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-border/70 bg-card/95 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <Users className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No users found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => {
                const role = roleConfig[user.role as keyof typeof roleConfig];
                const RoleIcon = role.icon;

                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold shadow-inner border border-primary/20">
                          <span className="text-sm">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={role.variant} className="gap-1">
                        <RoleIcon className="h-3 w-3" />
                        {role.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.projects}</TableCell>
                    <TableCell>
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "active" ? "outline" : "secondary"}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
