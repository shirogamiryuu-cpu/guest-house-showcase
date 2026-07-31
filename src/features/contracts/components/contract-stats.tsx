"use client"

import {
  FileText,
  Clock,
  CheckCircle2,
  BadgeCheck,
  XCircle,
} from "lucide-react"

const ICONS = {
  total: FileText,
  pending: Clock,
  active: CheckCircle2,
  completed: BadgeCheck,
  expired: XCircle,
} as const

const TONES = {
  total: "bg-[#eef0ff] text-[#3343a5]",
  pending: "bg-amber-50 text-amber-600",
  active: "bg-emerald-50 text-emerald-600",
  completed: "bg-sky-50 text-sky-600",
  expired: "bg-red-50 text-red-500",
} as const

export interface StatItem {
  key: keyof typeof ICONS
  value: number
  label: string
  hint: string
}

export function ContractStats({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => {
        const Icon = ICONS[item.key]
        return (
          <div
            key={item.key}
            className="flex items-center gap-3 rounded-[16px] border border-[#3343a5]/12 bg-white p-4 shadow-[0_2px_10px_rgba(19,22,38,0.05)]"
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-full ${TONES[item.key]}`}
            >
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-2xl font-semibold leading-none text-[#131626]">
                {item.value}
              </p>
              <p className="mt-1 truncate font-sans text-sm font-medium text-[#131626]">
                {item.label}
              </p>
              <p className="truncate font-sans text-xs text-[#3343a5]/70">{item.hint}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
