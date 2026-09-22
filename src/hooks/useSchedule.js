import { useFetch } from './useFetch'
import { getSchedule } from '../services/scheduleService'

export function useSchedule() {
  return useFetch(getSchedule)
}
