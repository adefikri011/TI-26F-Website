import { useFetch } from './useFetch'
import { getMembers } from '../services/membersService'

export function useMembers() {
  return useFetch(getMembers)
}
