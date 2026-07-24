import type { ChecklistItemContent } from '../types'

export const departureChecklist = [
  { id: 'water', labelKey: 'checklist.items.water', category: 'vehicle', initiallyCompleted: true },
  { id: 'gas', labelKey: 'checklist.items.gas', category: 'vehicle', initiallyCompleted: false },
  { id: 'chairs', labelKey: 'checklist.items.chairs', category: 'camp', initiallyCompleted: true },
  { id: 'camera', labelKey: 'checklist.items.camera', category: 'camera', initiallyCompleted: false }
] satisfies ChecklistItemContent[]
