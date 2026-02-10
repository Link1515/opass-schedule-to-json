import type { Room } from '../types/Room'

const roomDefaults = {
  id: '',
  name_zh: '',
  name_en: '',
  description_zh: '',
  description_en: '',
}

export function normalizeRooms(rawRooms: Record<string, string>[] = []): Room[] {
  if (rawRooms.length === 0) return []

  return rawRooms.map(rawRoom => {
    const { id, name_zh, name_en, description_zh, description_en } = { ...roomDefaults, ...rawRoom }
    const zh = {
      name: name_zh,
      description: description_zh,
    }
    const en = {
      name: name_en,
      description: description_en,
    }

    return { id, zh, en }
  })
}
