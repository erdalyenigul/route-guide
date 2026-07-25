export interface AdminUser {
  id: string
  username: string
  displayName: string
}

export interface SharedStopPhoto {
  id: string
  url: string
  storagePath: string | null
  bucket: 'covers' | 'gallery'
  caption: string | null
  isCover: boolean
  position: number
  sourceType: 'guide' | 'placeholder' | 'trip'
}

export interface SharedStopExperience {
  body: string
  locale: 'en' | 'tr'
  isPublished: boolean
  authorName: string | null
  updatedAt: string | null
}

export interface SharedStopEditorData {
  stopId: string
  stopSlug: string
  titleKey: string
  photos: SharedStopPhoto[]
  experiences: Record<'en' | 'tr', SharedStopExperience>
}

export interface SaveExperienceInput {
  body: string
  locale: 'en' | 'tr'
  isPublished: boolean
}
