import { Project, ItemType, InventoryItem, Beneficiary, Donor, ProofSubmission, ActivityLog } from "@/types";

export const mockProjects: Project[] = [
  {
    id: "proj-001",
    name: "Tech Empowerment 2024",
    description: "Providing laptops and tech resources to aspiring Nigerian developers",
    targetAmount: 15000000,
    raisedAmount: 8500000,
    beneficiariesCount: 89,
    itemsDistributed: 45,
    status: "ongoing",
    submissionStatus: "approved",
    ownerName: "Emeka Okafor",
    ownerEmail: "emeka@example.com",
    category: "Technology",
    createdAt: "2024-01-01",
  },
  {
    id: "proj-002",
    name: "Back to School 2024",
    description: "School supplies and textbooks for students in need",
    targetAmount: 5000000,
    raisedAmount: 3200000,
    beneficiariesCount: 156,
    itemsDistributed: 312,
    status: "ongoing",
    submissionStatus: "approved",
    ownerName: "Ngozi Adebayo",
    ownerEmail: "ngozi@example.com",
    category: "Education",
    createdAt: "2024-02-15",
  },
  {
    id: "proj-003",
    name: "Food Relief Program",
    description: "Monthly food packs for families affected by economic hardship",
    targetAmount: 8000000,
    raisedAmount: 8000000,
    beneficiariesCount: 400,
    itemsDistributed: 400,
    status: "finished",
    submissionStatus: "approved",
    ownerName: "Ibrahim Hassan",
    ownerEmail: "ibrahim@example.com",
    category: "Food & Nutrition",
    createdAt: "2023-11-01",
  },
  {
    id: "proj-004",
    name: "Healthcare Access Initiative",
    description: "Providing medical supplies and health education to rural communities",
    targetAmount: 10000000,
    raisedAmount: 0,
    beneficiariesCount: 0,
    itemsDistributed: 0,
    status: "upcoming",
    submissionStatus: "pending",
    ownerName: "Amaka Nwosu",
    ownerEmail: "amaka@example.com",
    category: "Healthcare",
    createdAt: "2024-03-01",
  },
  {
    id: "proj-005",
    name: "Skills Training Program",
    description: "Vocational training for unemployed youth in urban areas",
    targetAmount: 7500000,
    raisedAmount: 0,
    beneficiariesCount: 0,
    itemsDistributed: 0,
    status: "upcoming",
    submissionStatus: "pending",
    ownerName: "Chidi Okeke",
    ownerEmail: "chidi@example.com",
    category: "Skills Training",
    createdAt: "2024-03-05",
  },
];

export const mockItemTypes: ItemType[] = [
  { id: "item-laptop", name: "Laptop", category: "Electronics", icon: "Laptop", unitValue: 350000, totalQuantity: 100, assignedQuantity: 45 },
  { id: "item-food", name: "Food Pack", category: "Essentials", icon: "Package", unitValue: 25000, totalQuantity: 500, assignedQuantity: 400 },
  { id: "item-textbook", name: "Textbook Set", category: "Education", icon: "BookOpen", unitValue: 15000, totalQuantity: 300, assignedQuantity: 156 },
  { id: "item-cash", name: "Cash Grant", category: "Financial", icon: "Banknote", unitValue: 50000, totalQuantity: 200, assignedQuantity: 50 },
  { id: "item-sewing", name: "Sewing Machine", category: "Equipment", icon: "Scissors", unitValue: 80000, totalQuantity: 50, assignedQuantity: 12 },
];

export const mockInventory: InventoryItem[] = [
  { id: "inv-001", itemTypeId: "item-laptop", itemTypeName: "Laptop", identifier: "LT-2024-045", batchNumber: "BATCH-001", assignedTo: "Adaeze Obiora", status: "delivered", deliveryDate: "2024-01-10", projectId: "proj-001" },
  { id: "inv-002", itemTypeId: "item-laptop", itemTypeName: "Laptop", identifier: "LT-2024-046", batchNumber: "BATCH-001", assignedTo: "Olumide Femi", status: "delivered", deliveryDate: "2024-01-11", projectId: "proj-001" },
  { id: "inv-003", itemTypeId: "item-laptop", itemTypeName: "Laptop", identifier: "LT-2024-047", batchNumber: "BATCH-001", assignedTo: "Chioma Eze", status: "delivered", deliveryDate: "2024-01-12", projectId: "proj-001" },
  { id: "inv-004", itemTypeId: "item-laptop", itemTypeName: "Laptop", identifier: "LT-2024-048", batchNumber: "BATCH-001", assignedTo: "Ibrahim Yusuf", status: "assigned", deliveryDate: null, projectId: "proj-001" },
  { id: "inv-005", itemTypeId: "item-laptop", itemTypeName: "Laptop", identifier: "LT-2024-049", batchNumber: "BATCH-002", assignedTo: null, status: "available", deliveryDate: null, projectId: "proj-001" },
  { id: "inv-006", itemTypeId: "item-laptop", itemTypeName: "Laptop", identifier: "LT-2024-050", batchNumber: "BATCH-002", assignedTo: null, status: "available", deliveryDate: null, projectId: "proj-001" },
  { id: "inv-007", itemTypeId: "item-food", itemTypeName: "Food Pack", identifier: "FP-001", batchNumber: "FOOD-BATCH-001", assignedTo: null, status: "available", deliveryDate: null, projectId: "proj-003" },
  { id: "inv-008", itemTypeId: "item-food", itemTypeName: "Food Pack", identifier: "FP-002", batchNumber: "FOOD-BATCH-001", assignedTo: null, status: "available", deliveryDate: null, projectId: "proj-003" },
  { id: "inv-009", itemTypeId: "item-textbook", itemTypeName: "Textbook Set", identifier: "TB-001", batchNumber: "EDU-001", assignedTo: null, status: "available", deliveryDate: null, projectId: "proj-002" },
  { id: "inv-010", itemTypeId: "item-cash", itemTypeName: "Cash Grant", identifier: "CG-001", assignedTo: null, status: "available", deliveryDate: null, projectId: "proj-001" },
];

export const mockBeneficiaries: Beneficiary[] = [
  { id: "ben-001", name: "Adaeze Obiora", email: "adaeze@email.com", phone: "08012345678", location: "Lagos", socialHandle: "adaeze_dev", reason: "Aspiring software developer", status: "completed", appliedItems: ["Laptop"], approvedItems: ["Laptop"], assignedItems: [{ itemTypeId: "item-laptop", itemTypeName: "Laptop", itemId: "inv-001", identifier: "LT-2024-045", assignedAt: "2024-01-08", deliveredAt: "2024-01-10" }], hasProof: true, createdAt: "2024-01-01", projectId: "proj-001" },
  { id: "ben-002", name: "Olumide Femi", email: "olumide@email.com", phone: "08023456789", location: "Abuja", socialHandle: "olumide_codes", reason: "Frontend developer seeking better tools", status: "completed", appliedItems: ["Laptop"], approvedItems: ["Laptop"], assignedItems: [{ itemTypeId: "item-laptop", itemTypeName: "Laptop", itemId: "inv-002", identifier: "LT-2024-046", assignedAt: "2024-01-09", deliveredAt: "2024-01-11" }], hasProof: true, createdAt: "2024-01-02", projectId: "proj-001" },
  { id: "ben-003", name: "Chioma Eze", email: "chioma@email.com", location: "Enugu", socialHandle: "chioma_tech", status: "delivered", appliedItems: ["Laptop"], approvedItems: ["Laptop"], assignedItems: [{ itemTypeId: "item-laptop", itemTypeName: "Laptop", itemId: "inv-003", identifier: "LT-2024-047", assignedAt: "2024-01-10", deliveredAt: "2024-01-12" }], hasProof: false, createdAt: "2024-01-03", projectId: "proj-001" },
  { id: "ben-004", name: "Ibrahim Yusuf", email: "ibrahim@email.com", location: "Kano", socialHandle: "ibrahim_builds", status: "awaiting_proof", appliedItems: ["Laptop"], approvedItems: ["Laptop"], assignedItems: [{ itemTypeId: "item-laptop", itemTypeName: "Laptop", itemId: "inv-004", identifier: "LT-2024-048", assignedAt: "2024-01-11" }], hasProof: false, createdAt: "2024-01-04", projectId: "proj-001" },
  { id: "ben-005", name: "Blessing Okonkwo", email: "blessing@email.com", location: "Rivers", socialHandle: "blessing_dev", status: "approved", appliedItems: ["Laptop", "Cash Grant"], approvedItems: ["Laptop"], assignedItems: [], hasProof: false, createdAt: "2024-01-05", projectId: "proj-001" },
  { id: "ben-006", name: "Ahmed Suleiman", email: "ahmed@email.com", location: "Kaduna", socialHandle: "ahmed_codes", status: "pending", appliedItems: ["Laptop"], approvedItems: [], assignedItems: [], hasProof: false, createdAt: "2024-01-06", projectId: "proj-001" },
  { id: "ben-007", name: "Grace Adewale", email: "grace@email.com", location: "Oyo", socialHandle: "grace_tech", status: "pending", appliedItems: ["Textbook Set", "Cash Grant"], approvedItems: [], assignedItems: [], hasProof: false, createdAt: "2024-01-07", projectId: "proj-002" },
];

export const mockDonors: Donor[] = [
  { id: "don-001", name: "Don Jazzy", email: "donjazzy@email.com", amount: 20000000, isAnonymous: false, projectId: "proj-001", createdAt: "2024-01-15" },
  { id: "don-002", name: "Anonymous", email: "anon@email.com", amount: 500000, isAnonymous: true, projectId: "proj-001", createdAt: "2024-01-14" },
  { id: "don-003", name: "Ngozi Adebayo", email: "ngozi@email.com", amount: 75000, isAnonymous: false, projectId: "proj-001", createdAt: "2024-01-13" },
  { id: "don-004", name: "Chukwuemeka Nwosu", email: "chuk@email.com", amount: 200000, isAnonymous: false, projectId: "proj-002", createdAt: "2024-01-12" },
];

export const mockProofs: ProofSubmission[] = [
  { id: "proof-001", beneficiaryId: "ben-001", beneficiaryName: "Adaeze Obiora", socialHandle: "adaeze_dev", location: "Lagos", itemsReceived: ["Laptop"], imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop", uploadDate: "2024-01-10", isVerified: true, projectId: "proj-001" },
  { id: "proof-002", beneficiaryId: "ben-002", beneficiaryName: "Olumide Femi", socialHandle: "olumide_codes", location: "Abuja", itemsReceived: ["Laptop"], imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", uploadDate: "2024-01-11", isVerified: true, projectId: "proj-001" },
  { id: "proof-003", beneficiaryId: "ben-003", beneficiaryName: "Chioma Eze", socialHandle: "chioma_tech", location: "Enugu", itemsReceived: ["Laptop"], imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", uploadDate: "2024-01-12", isVerified: false, projectId: "proj-001" },
  { id: "proof-004", beneficiaryId: "ben-004", beneficiaryName: "Ibrahim Yusuf", socialHandle: "ibrahim_builds", location: "Kano", itemsReceived: ["Laptop"], imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", uploadDate: "2024-01-13", isVerified: false, projectId: "proj-001" },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: "log-001", action: "Beneficiary approved", user: "Adaeze Obiora", type: "approval", timestamp: "2024-01-15T10:30:00Z", projectId: "proj-001" },
  { id: "log-002", action: "Donation received", user: "Emeka Okafor", details: "₦150,000", type: "donation", timestamp: "2024-01-15T10:15:00Z", projectId: "proj-001" },
  { id: "log-003", action: "Proof uploaded", user: "Olumide Femi", type: "proof", timestamp: "2024-01-15T09:00:00Z", projectId: "proj-001" },
  { id: "log-004", action: "Item assigned", user: "Chioma Eze", details: "LT-2024-047", type: "assignment", timestamp: "2024-01-15T08:00:00Z", projectId: "proj-001" },
  { id: "log-005", action: "New registration", user: "Ibrahim Yusuf", type: "registration", timestamp: "2024-01-15T07:00:00Z", projectId: "proj-001" },
  { id: "log-006", action: "Project created", user: "Admin", details: "Back to School 2024", type: "project", timestamp: "2024-02-15T10:00:00Z" },
  { id: "log-007", action: "Proof verified", user: "Adaeze Obiora", type: "verification", timestamp: "2024-01-15T11:00:00Z", projectId: "proj-001" },
];

// Summary stats
export const getDashboardStats = (projectId?: string) => {
  const filteredBeneficiaries = projectId 
    ? mockBeneficiaries.filter(b => b.projectId === projectId)
    : mockBeneficiaries;
  
  const filteredDonors = projectId
    ? mockDonors.filter(d => d.projectId === projectId)
    : mockDonors;

  const filteredInventory = projectId
    ? mockInventory.filter(i => i.projectId === projectId)
    : mockInventory;

  return {
    totalRaised: filteredDonors.reduce((sum, d) => sum + d.amount, 0),
    totalDonors: filteredDonors.length,
    beneficiariesApproved: filteredBeneficiaries.filter(b => b.status !== "pending").length,
    itemsDelivered: filteredInventory.filter(i => i.status === "delivered").length,
    pendingApprovals: filteredBeneficiaries.filter(b => b.status === "pending").length,
    pendingProofs: filteredBeneficiaries.filter(b => b.status === "awaiting_proof").length,
  };
};

export const getItemDistributionSummary = () => {
  return mockItemTypes.map(item => ({
    name: item.name,
    icon: item.icon,
    distributed: item.assignedQuantity,
    total: item.totalQuantity,
  }));
};
