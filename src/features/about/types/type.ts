export interface ValueItem {
  label: string
}

export interface MissionVisionData {
  title: string
  description: string
  icon: "book" | "keyboard" | "dollar"
}

export interface MissionVisionValuesProps {
  missionVision: MissionVisionData[]
  values: ValueItem[]
}
