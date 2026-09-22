import { supabase } from '../lib/supabase'

export async function getGallery() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('photo_date', { ascending: false, nullsFirst: false })
    .order('id', { ascending: false })
  if (error) throw error
  return data
}

export async function addGallery(item) {
  const { data, error } = await supabase
    .from('gallery')
    .insert(item)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteGallery(id) {
  const { error } = await supabase.from('gallery').delete().eq('id', id)
  if (error) throw error
}
