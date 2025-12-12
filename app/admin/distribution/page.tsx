"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Laptop, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface Beneficiary {
  id: number;
  name: string;
  state: string;
  twitterHandle: string;
}

interface LaptopItem {
  id: number;
  serialNumber: string;
  batchNumber: string;
}

const unassignedBeneficiaries: Beneficiary[] = [
  { id: 5, name: "Blessing Okonkwo", state: "Rivers", twitterHandle: "blessing_dev" },
  { id: 6, name: "Ahmed Suleiman", state: "Kaduna", twitterHandle: "ahmed_codes" },
  { id: 7, name: "Grace Adewale", state: "Oyo", twitterHandle: "grace_tech" },
];

const availableLaptops: LaptopItem[] = [
  { id: 6, serialNumber: "LT-2024-050", batchNumber: "BATCH-002" },
  { id: 7, serialNumber: "LT-2024-051", batchNumber: "BATCH-002" },
  { id: 8, serialNumber: "LT-2024-052", batchNumber: "BATCH-002" },
];

export default function AdminDistribution() {
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<number[]>([]);
  const [selectedLaptops, setSelectedLaptops] = useState<number[]>([]);

  const toggleBeneficiary = (id: number) => {
    setSelectedBeneficiaries(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const toggleLaptop = (id: number) => {
    setSelectedLaptops(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const handleAssign = () => {
    if (selectedBeneficiaries.length === 0 || selectedLaptops.length === 0) {
      toast.error("Please select at least one beneficiary and one laptop");
      return;
    }

    if (selectedBeneficiaries.length !== selectedLaptops.length) {
      toast.error("Number of beneficiaries must match number of laptops");
      return;
    }

    toast.success(`${selectedBeneficiaries.length} laptop(s) assigned successfully`);
    setSelectedBeneficiaries([]);
    setSelectedLaptops([]);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Distribution</h1>
        <p className="text-muted-foreground">
          Assign laptops to approved beneficiaries
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr]">
        {/* Beneficiaries Column */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-display text-lg font-semibold">
              Approved Beneficiaries
            </h2>
            <Badge variant="secondary">{unassignedBeneficiaries.length}</Badge>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Select beneficiaries to assign laptops
          </p>
          <div className="space-y-3">
            {unassignedBeneficiaries.map((beneficiary) => (
              <div
                key={beneficiary.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                  selectedBeneficiaries.includes(beneficiary.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-secondary/50"
                }`}
                onClick={() => toggleBeneficiary(beneficiary.id)}
              >
                <Checkbox
                  checked={selectedBeneficiaries.includes(beneficiary.id)}
                  onCheckedChange={() => toggleBeneficiary(beneficiary.id)}
                />
                <div className="flex-1">
                  <p className="font-medium">{beneficiary.name}</p>
                  <p className="text-sm text-muted-foreground">
                    @{beneficiary.twitterHandle} • {beneficiary.state}
                  </p>
                </div>
              </div>
            ))}
            {unassignedBeneficiaries.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                No unassigned beneficiaries
              </p>
            )}
          </div>
        </div>

        {/* Assignment Action */}
        <div className="flex items-center justify-center">
          <Button
            size="lg"
            onClick={handleAssign}
            disabled={selectedBeneficiaries.length === 0 || selectedLaptops.length === 0}
            className="flex-col gap-2 px-8 py-6 lg:flex-row"
          >
            <span>Assign</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Laptops Column */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Laptop className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-display text-lg font-semibold">
              Available Laptops
            </h2>
            <Badge variant="secondary">{availableLaptops.length}</Badge>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Select laptops to assign
          </p>
          <div className="space-y-3">
            {availableLaptops.map((laptop) => (
              <div
                key={laptop.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                  selectedLaptops.includes(laptop.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-secondary/50"
                }`}
                onClick={() => toggleLaptop(laptop.id)}
              >
                <Checkbox
                  checked={selectedLaptops.includes(laptop.id)}
                  onCheckedChange={() => toggleLaptop(laptop.id)}
                />
                <div className="flex-1">
                  <p className="font-mono font-medium">{laptop.serialNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {laptop.batchNumber}
                  </p>
                </div>
              </div>
            ))}
            {availableLaptops.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                No available laptops
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {(selectedBeneficiaries.length > 0 || selectedLaptops.length > 0) && (
        <div className="mt-8 rounded-xl border border-primary bg-primary/5 p-6">
          <h3 className="mb-2 font-semibold">Selection Summary</h3>
          <p className="text-sm text-muted-foreground">
            {selectedBeneficiaries.length} beneficiary(s) selected •{" "}
            {selectedLaptops.length} laptop(s) selected
          </p>
          {selectedBeneficiaries.length !== selectedLaptops.length && (
            <p className="mt-2 text-sm text-warning">
              ⚠️ Please select equal numbers to proceed
            </p>
          )}
        </div>
      )}
    </div>
  );
}
