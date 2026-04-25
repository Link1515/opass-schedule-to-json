import type { SessionType } from '~/types/SessionType'

const sessionTypeDefaults = {
  id: null,
  name_zh: null,
  name_en: null,
  description_zh: null,
  description_en: null,
}

export function normalizeSessionTypes(rawSessionTypes: Record<string, string>[] = []): SessionType[] {
  if (rawSessionTypes.length === 0) return []

  return rawSessionTypes.map(rawSessionType => {
    const sessionType = {
      ...sessionTypeDefaults,
      ...Object.fromEntries(Object.entries(rawSessionType).map(([key, value]) => [key, value === '' ? null : value])),
    }
    const { id, name_zh, name_en, description_zh, description_en } = sessionType
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
