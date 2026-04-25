import type { Tag } from '~/types/Tag'

const tagDefaults = {
  id: null,
  name_zh: null,
  name_en: null,
  description_zh: null,
  description_en: null,
}

export function normalizeTags(rawTags: Record<string, string>[] = []): Tag[] {
  if (rawTags.length === 0) return []

  return rawTags.map(rawTag => {
    const tag = {
      ...tagDefaults,
      ...Object.fromEntries(Object.entries(rawTag).map(([key, value]) => [key, value === '' ? null : value])),
    }
    const { id, name_zh, name_en, description_zh, description_en } = tag
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
