"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Search, Download, Eye, Image as ImageIcon } from "lucide-react";

const mockDonors = [
  { id: 1, name: "Don Jazzy", email: "donjazzy@example.com", amount: 20000000, date: "2024-01-15", hasReceipt: true },
  { id: 2, name: "Anonymous", email: "anon@example.com", amount: 500000, date: "2024-01-14", hasReceipt: false },
  { id: 3, name: "Ngozi Adebayo", email: "ngozi@example.com", amount: 75000, date: "2024-01-13", hasReceipt: true },
  { id: 4, name: "Chukwuemeka Nwosu", email: "chukwu@example.com", amount: 200000, date: "2024-01-12", hasReceipt: true },
  { id: 5, name: "Fatima Ibrahim", email: "fatima@example.com", amount: 100000, date: "2024-01-11", hasReceipt: false },
  { id: 6, name: "Oluwaseun Bello", email: "seun@example.com", amount: 350000, date: "2024-01-10", hasReceipt: true },
  { id: 7, name: "Anonymous", email: "anon2@example.com", amount: 50000, date: "2024-01-09", hasReceipt: false },
  { id: 8, name: "Amara Okeke", email: "amara@example.com", amount: 125000, date: "2024-01-08", hasReceipt: true },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function AdminDonors() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const filteredDonors = mockDonors
    .filter(donor => 
      donor.name.toLowerCase().includes(search.toLowerCase()) ||
      donor.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "amount") return b.amount - a.amount;
      return 0;
    });

  const totalAmount = filteredDonors.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Donors</h1>
          <p className="text-muted-foreground">
            {filteredDonors.length} donors • {formatCurrency(totalAmount)} total
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date (Newest)</SelectItem>
            <SelectItem value="amount">Amount (Highest)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonors.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell className="font-medium">{donor.name}</TableCell>
                <TableCell className="text-muted-foreground">{donor.email}</TableCell>
                <TableCell className="font-semibold text-success">
                  {formatCurrency(donor.amount)}
                </TableCell>
                <TableCell>{formatDate(donor.date)}</TableCell>
                <TableCell>
                  {donor.hasReceipt ? (
                    <Badge className="gap-1 bg-primary/10 text-primary hover:bg-primary/20 border-transparent">
                      <ImageIcon className="h-3 w-3" />
                      Uploaded
                    </Badge>
                  ) : (
                    <Badge variant="secondary">None</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
