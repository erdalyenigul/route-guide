import type { AdminUser, SaveExperienceInput, SharedStopEditorData } from '../types'

export interface AdminContentRepository {
  currentUser(): Promise<AdminUser | null>
  signIn(username: string, password: string): Promise<AdminUser>
  signOut(): Promise<void>
  getStopEditor(stopSlug: string): Promise<SharedStopEditorData>
  saveExperience(stopSlug: string, input: SaveExperienceInput): Promise<void>
  uploadPhoto(stopSlug: string, image: Blob, caption: string): Promise<void>
  deletePhoto(photoId: string): Promise<void>
  setCover(stopSlug: string, photoId: string): Promise<void>
}
