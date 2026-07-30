const roadConditionAliases: Record<string, string> = {
  'asphalt then rough track': 'asphaltThenRoughTrack',
  'asphalt then variable coastal surface': 'asphaltThenVariableCoastalSurface',
  'asphalt then variable cove approach': 'asphaltThenVariableCoveApproach',
  'narrow final approach': 'narrowFinalApproach',
  'narrow waterfront streets': 'narrowWaterfrontStreets',
  'urban main road': 'urbanMainRoad',
  'urban street': 'urbanStreet',
  'urban streets and marina traffic': 'urbanStreetsAndMarinaTraffic',
  'busy beach approach streets': 'busyBeachApproachStreets',
  'busy urban streets near the old town and harbour': 'busyOldTownAndHarbourStreets'
}

export function roadConditionKey(value: string): string {
  return roadConditionAliases[value] ?? value
}
