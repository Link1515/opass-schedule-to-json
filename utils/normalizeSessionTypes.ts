import type { SessionType } from '~/types/SessionType'

const sessionTypeDefaults = {
  id: '',
  name_zh: '',
  name_en: '',
  description_zh: '',
  description_en: '',
}

export function normalizeSessionTypes(rawSessionTypes: Record<string, string>[] = []): SessionType[] {
  if (rawSessionTypes.length === 0) return []

  return rawSessionTypes.map(sessionType => {
    const { id, name_zh, name_en, description_zh, description_en } = { ...sessionTypeDefaults, ...sessionType }
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
