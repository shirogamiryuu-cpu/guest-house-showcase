import type { Database } from "@/integrations/supabase/types"

export type ContractRow = Database["public"]["Tables"]["contracts"]["Row"]

export const CONTRACT_STATUSES = [
  "pending",
  "active",
  "completed",
  "expired",
  "rejected",
] as const

export type ContractStatus = (typeof CONTRACT_STATUSES)[number]

export const PROJECT_TYPES = [
  "Web Development",
  "Mobile App",
  "E-commerce",
  "Design",
  "Maintenance",
  "Other",
] as const

export const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-[#eef0ff] text-[#3343a5] border-[#3343a5]/25",
  expired: "bg-red-50 text-red-600 border-red-200",
  rejected: "bg-neutral-100 text-neutral-600 border-neutral-200",
}

export const statusLabels: Record<string, string> = {
  pending: "Pending Signature",
  active: "Active",
  completed: "Completed",
  expired: "Expired",
  rejected: "Rejected",
}

export function formatMoney(amount: number, currency: string) {
  const value = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(Number(amount || 0))
  return `${value} ${currency}`
}

export function formatDate(value: string | null) {
  if (!value) return "—"
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
