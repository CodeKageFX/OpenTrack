"use client"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Download, MoreHorizontal, Check, X, Eye, MessageSquare, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { mockBeneficiaries } from "@/data/mockdata";
import { BeneficiaryStatus } from "@/types";

const statusConfig: Record<BeneficiaryStatus, { label: string; variant: "pending" | "approved" | "delivered" | "warning" | "success" }> = {
  pending: { label: "Pending", variant: "pending" },
  approved: { label: "Approved", variant: "approved" },
  assigned: { label: "Assigned", variant: "approved" },
  delivered: { label: "Delivered", variant: "delivered" },
  awaiting_proof: { label: "Awaiting Proof", variant: "warning" },
  completed: { label: "Completed", variant: "success" },
};

const nigerianStates = ["All States", "Lagos", "Abuja", "Enugu", "Kano", "Rivers", "Kaduna", "Oyo", "Delta"];

export default function AdminBeneficiaries() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("All States");

  const filteredBeneficiaries = mockBeneficiaries.filter(b => {
    const matchesSearch = 
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      (b.socialHandle?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      b.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesState = stateFilter === "All States" || b.location === stateFilter;
    return matchesSearch && matchesStatus && matchesState;
  });

  const handleApprove = (id: string) => {
    toast.success("Beneficiary approved successfully");
  };

  const handleReject = (id: string) => {
    toast.error("Beneficiary rejected");
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Beneficiaries</h1>
          <p className="text-muted-foreground">
            {filteredBeneficiaries.length} beneficiaries found
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
            placeholder="Search by name, handle, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="awaiting_proof">Awaiting Proof</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={stateFilter} onValueChange={setStateFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            {nigerianStates.map((state) => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/70 bg-card/95 overflow-x-auto shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Applied Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Proof</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBeneficiaries.map((beneficiary) => (
              <TableRow key={beneficiary.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{beneficiary.name}</p>
                    <p className="text-sm text-muted-foreground">{beneficiary.location}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{beneficiary.email}</p>
                    {beneficiary.socialHandle && (
                      <p className="text-muted-foreground">@{beneficiary.socialHandle}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {beneficiary.appliedItems.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge>
                    {statusConfig[beneficiary.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {beneficiary.hasProof ? (
                    <Badge className="gap-1">
                      <ImageIcon className="h-3 w-3" />
                      Uploaded
                    </Badge>
                  ) : (
                    <Badge variant="secondary">None</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {beneficiary.assignedItems.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {beneficiary.assignedItems.map((item, idx) => (
                        <Badge key={idx} className="text-xs">
                          {item.itemTypeName}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {beneficiary.status === "pending" && (
                        <>
                          <DropdownMenuItem onClick={() => handleApprove(beneficiary.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReject(beneficiary.id)} className="text-destructive">
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
