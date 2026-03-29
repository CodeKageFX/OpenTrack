// Universal types for LazTrack platform

export type ProjectStatus = "ongoing" | "finished" | "upcoming";
export type ProjectSubmissionStatus = "pending" | "approved" | "rejected";

export interface Project {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  beneficiariesCount: number;
  itemsDistributed: number;
  status: ProjectStatus;
  submissionStatus: ProjectSubmissionStatus;
  ownerName: string;
  ownerEmail: string;
  createdAt: string;
  publicUrl?: string;
  documents?: string[];
  category?: string;
  adminNotes?: string;
}

export interface ProjectSubmission {
  id: string;
  name: string;
  description: string;
  ownerName: string;
  ownerEmail: string;
  targetAmount: number;
  category: string;
  documents?: string[];
  status: ProjectSubmissionStatus;
  submittedAt: string;
  reviewedAt?: string;
  adminNotes?: string;
}

export interface ItemType {
  id: string;
  name: string;
  category: string;
  icon: string; // icon name from lucide
  unitValue?: number;
  totalQuantity: number;
  assignedQuantity: number;
  expiryDate?: string;
}

export interface InventoryItem {
  id: string;
  itemTypeId: string;
  itemTypeName: string;
  identifier: string; // serial number, batch code, etc.
  batchNumber?: string;
  assignedTo: string | null;
  status: "available" | "assigned" | "delivered";
  deliveryDate: string | null;
  projectId: string;
}

export type BeneficiaryStatus = "pending" | "approved" | "assigned" | "delivered" | "awaiting_proof" | "completed";

export interface Beneficiary {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  socialHandle?: string;
  reason?: string;
  status: BeneficiaryStatus;
  appliedItems: string[];
  approvedItems: string[];
  assignedItems: AssignedItem[];
  hasProof: boolean;
  documents?: string[];
  createdAt: string;
  projectId?: string;
}

export interface AssignedItem {
  itemTypeId: string;
  itemTypeName: string;
  itemId: string;
  identifier: string;
  assignedAt: string;
  deliveredAt?: string;
}

export interface Donor {
  id: string;
  name: string;
  email: string;
  amount: number;
  isAnonymous: boolean;
  projectId?: string;
  receiptUrl?: string;
  createdAt: string;
}

export interface ProofSubmission {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  socialHandle?: string;
  location: string;
  itemsReceived: string[];
  imageUrl: string;
  uploadDate: string;
  isVerified: boolean;
  projectId?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  details?: string;
  type: "approval" | "donation" | "proof" | "assignment" | "registration" | "project" | "item" | "verification";
  timestamp: string;
  projectId?: string;
}
