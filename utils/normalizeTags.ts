import type { Tag } from '../types/Tag'

const tagDefaults = {
  id: '',
  name_zh: '',
  name_en: '',
  description_zh: '',
  description_en: '',
}

export function normalizeTags(rawTags: Record<string, string>[]): Tag[] {
  if (rawTags.length === 0) return []

  return rawTags.map(rawTag => {
    const { id, name_zh, name_en, description_zh, description_en } = { ...tagDefaults, ...rawTag }
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
