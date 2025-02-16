export const VIEW_TYPES = {
  TABLE: 'table',
  GRID: 'grid',
} as const

export type ViewType = typeof VIEW_TYPES[keyof typeof VIEW_TYPES]

export const DEFAULT_VIEW = VIEW_TYPES.TABLE
