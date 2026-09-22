import { useFetch } from './useFetch'
import { getAnnouncements } from '../services/announcementsService'

export function useAnnouncements() {
  return useFetch(getAnnouncements)
}
