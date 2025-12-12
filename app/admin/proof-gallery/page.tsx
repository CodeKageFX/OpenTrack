"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle, ExternalLink, Twitter } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ProofItem {
  id: number;
  name: string;
  twitterHandle: string;
  state: string;
  imageUrl: string;
  uploadDate: string;
  isVerified: boolean;
}

const mockProofs: ProofItem[] = [
  { id: 1, name: "Adaeze Obiora", twitterHandle: "adaeze_dev", state: "Lagos", imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop", uploadDate: "2024-01-10", isVerified: true },
  { id: 2, name: "Olumide Femi", twitterHandle: "olumide_codes", state: "Abuja", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", uploadDate: "2024-01-11", isVerified: true },
  { id: 3, name: "Chioma Eze", twitterHandle: "chioma_tech", state: "Enugu", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", uploadDate: "2024-01-12", isVerified: false },
  { id: 4, name: "Ibrahim Yusuf", twitterHandle: "ibrahim_builds", state: "Kano", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", uploadDate: "2024-01-13", isVerified: false },
];

const nigerianStates = ["All States", "Lagos", "Abuja", "Enugu", "Kano", "Rivers", "Kaduna", "Oyo", "Delta"];

export default function AdminProofGallery() {
  const [verifiedFilter, setVerifiedFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("All States");
  const [selectedProof, setSelectedProof] = useState<ProofItem | null>(null);

  const filteredProofs = mockProofs.filter(proof => {
    const matchesVerified = 
      verifiedFilter === "all" ||
      (verifiedFilter === "verified" && proof.isVerified) ||
      (verifiedFilter === "unverified" && !proof.isVerified);
    const matchesState = stateFilter === "All States" || proof.state === stateFilter;
    return matchesVerified && matchesState;
  });

  const handleVerify = (id: number) => {
    toast.success("Proof verified successfully");
    setSelectedProof(null);
  };

  const handleReject = (id: number) => {
    toast.error("Proof rejected");
    setSelectedProof(null);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Proof Gallery</h1>
        <p className="text-muted-foreground">
          {filteredProofs.length} proofs • {filteredProofs.filter(p => !p.isVerified).length} pending verification
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Verification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
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

      {/* Gallery Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProofs.map((proof) => (
          <div
            key={proof.id}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg"
            onClick={() => setSelectedProof(proof)}
          >
            <div className="aspect-square overflow-hidden">
              <Image
                width={400}
                height={400}
                src={proof.imageUrl}
                alt={`${proof.name}'s proof`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute right-3 top-3">
              {proof.isVerified ? (
                <div className="flex items-center gap-1 rounded-full bg-success/90 px-2 py-1 text-xs font-medium text-success-foreground backdrop-blur-sm">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </div>
              ) : (
                <div className="flex items-center gap-1 rounded-full bg-warning/90 px-2 py-1 text-xs font-medium text-warning-foreground backdrop-blur-sm">
                  Pending
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{proof.name}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Twitter className="h-4 w-4" />
                <span>@{proof.twitterHandle}</span>
              </div>
              <Badge variant="secondary" className="mt-2">
                {proof.state}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Proof Detail Modal */}
      <Dialog open={!!selectedProof} onOpenChange={() => setSelectedProof(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProof && (
            <>
              <DialogHeader>
                <DialogTitle>Proof Details</DialogTitle>
                <DialogDescription>
                  Review and verify the delivery proof
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <Image
                    width={500}
                    height={500}
                    src={selectedProof.imageUrl}
                    alt={`${selectedProof.name}'s proof`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedProof.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">X Handle</p>
                    <a
                      href={`https://twitter.com/${selectedProof.twitterHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      @{selectedProof.twitterHandle}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">State</p>
                    <p className="font-medium">{selectedProof.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Upload Date</p>
                    <p className="font-medium">
                      {new Date(selectedProof.uploadDate).toLocaleDateString('en-NG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
              {!selectedProof.isVerified && (
                <DialogFooter>
                  <Button variant="outline" onClick={() => handleReject(selectedProof.id)}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button variant="outline" onClick={() => handleVerify(selectedProof.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Verify
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
