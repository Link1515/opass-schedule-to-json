import type { Speaker } from '../types/Speaker'

const speakerDefaults = {
  id: '',
  name_zh: '',
  name_en: '',
  avatar: '',
  bio_zh: '',
  bio_en: '',
}

export function normalizeSpeakers(rawSpeakers: Record<string, string>[] = [], avatarBaseUrl: string, defaultAvatar: string): Speaker[] {
  if (rawSpeakers.length === 0) return []

  rawSpeakers.splice(0, 1)
  return rawSpeakers.map(rawSpeaker => {
    const { id, name_zh, name_en, avatar, bio_zh, bio_en } = { ...speakerDefaults, ...rawSpeaker }

    avatarBaseUrl = avatarBaseUrl.endsWith('/') ? avatarBaseUrl : `${avatarBaseUrl}/`
    const formattedAvatar = avatar ? `${avatarBaseUrl}${avatar}` : defaultAvatar
    const zh = {
      name: name_zh,
      bio: bio_zh,
    }
    const en = {
      name: name_en,
      bio: bio_en,
    }

    return { id, avatar: formattedAvatar, zh, en }
  })
}
