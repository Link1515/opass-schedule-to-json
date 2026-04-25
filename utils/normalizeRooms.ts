import type { Room } from '~/types/Room'

const roomDefaults = {
  id: null,
  name_zh: null,
  name_en: null,
  description_zh: null,
  description_en: null,
}

export function normalizeRooms(rawRooms: Record<string, string>[] = []): Room[] {
  if (rawRooms.length === 0) return []

  return rawRooms.map(rawRoom => {
    const room = {
      ...roomDefaults,
      ...Object.fromEntries(Object.entries(rawRoom).map(([key, value]) => [key, value === '' ? null : value])),
    }
    const { id, name_zh, name_en, description_zh, description_en } = room
    const zh = {
      name: name_zh ?? '',
      description: description_zh ?? '',
    }
    const en = {
      name: name_en ?? '',
      description: description_en ?? '',
    }

    return { id, zh, en }
  })
}
