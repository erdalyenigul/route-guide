import type { StopContent } from '@/content/types'

export type TerrainProfile = 'gentle' | 'winding' | 'steep' | 'mountainous'

type TerrainFields = Pick<StopContent, 'steepGrade' | 'hairpins' | 'cliffExposure'>

export function terrainProfile(stop: TerrainFields): TerrainProfile | undefined {
  const hasAssessment = [stop.steepGrade, stop.hairpins, stop.cliffExposure]
    .some(value => value !== null && value !== undefined)

  if (!hasAssessment) return undefined
  if (stop.cliffExposure || (stop.steepGrade && stop.hairpins)) return 'mountainous'
  if (stop.steepGrade) return 'steep'
  if (stop.hairpins) return 'winding'
  return 'gentle'
}
