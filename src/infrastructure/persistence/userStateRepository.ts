import type { StopStatus } from '@/content/types'

export interface UserState {
  schemaVersion: 1
  favoriteStopIds: string[]
  stopStatuses: Record<string, StopStatus>
  checklistCompleted: Record<string, boolean>
}

const STORAGE_KEY = 'route-guide:user-state:v1'

function emptyState(): UserState {
  return { schemaVersion: 1, favoriteStopIds: [], stopStatuses: {}, checklistCompleted: {} }
}

export const userStateRepository = {
  load(): UserState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return emptyState()
      const parsed = JSON.parse(stored) as UserState
      return parsed.schemaVersion === 1 ? parsed : emptyState()
    } catch {
      return emptyState()
    }
  },
  save(state: UserState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}
