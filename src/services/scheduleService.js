import { supabase } from '../lib/supabase'

const DAY_ORDER = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

export async function getSchedule() {
  const { data, error } = await supabase
    .from('schedule')
    .select('*')
    .order('time_start', { ascending: true })
  if (error) throw error
  return [...data].sort(
    (a, b) =>
      DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day) ||
      a.sort_order - b.sort_order
  )
}

export async function addSchedule(item) {
  const { data, error } = await supabase
    .from('schedule')
    .insert(item)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateSchedule(id, updates) {
  const { data, error } = await supabase
    .from('schedule')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteSchedule(id) {
  const { error } = await supabase.from('schedule').delete().eq('id', id)
  if (error) throw error
}
