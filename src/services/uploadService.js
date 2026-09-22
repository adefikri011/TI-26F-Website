import { supabase } from '../lib/supabase'

function buildPath(bucket, file) {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return `${unique}.${ext}`
}

export async function uploadImage(bucket, file) {
  const path = buildPath(bucket, file)
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteImage(bucket, imageUrl) {
  const path = imageUrl.split(`/${bucket}/`)[1]
  if (!path) return
  const { error } = await supabase.storage.from(bucket).remove([decodeURIComponent(path)])
  if (error) throw error
}
