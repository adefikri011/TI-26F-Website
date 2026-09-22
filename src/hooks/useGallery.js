import { useFetch } from './useFetch'
import { getGallery } from '../services/galleryService'

export function useGallery() {
  return useFetch(getGallery)
}
