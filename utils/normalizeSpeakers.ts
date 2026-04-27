import type { Speaker } from '~/types/Speaker'
import type { SpeakerDefaults } from '~/types/SpeakerDefaults'

const speakerDefaults: SpeakerDefaults = {
  id: null,
  name_zh: null,
  name_en: null,
  avatar: null,
  bio_zh: null,
  bio_en: null,
}

export function normalizeSpeakers(rawSpeakers: Record<string, string>[] = [], avatarBaseUrl: string = '', defaultAvatar: string = ''): Speaker[] {
  if (rawSpeakers.length === 0) return []

  rawSpeakers.splice(0, 1)
  return rawSpeakers.map(rawSpeaker => {
    const speaker = {
      ...speakerDefaults,
      ...Object.fromEntries(Object.entries(rawSpeaker).map(([key, value]) => [key, value === '' ? null : value])),
    }
    const { id, name_zh, name_en, avatar, bio_zh, bio_en } = speaker

    avatarBaseUrl = avatarBaseUrl.endsWith('/') || avatarBaseUrl === '' ? avatarBaseUrl : `${avatarBaseUrl}/`
    const formattedAvatar = avatar ? `${avatarBaseUrl}${avatar}` : defaultAvatar || null
    const zh = {
      name: name_zh ?? '',
      bio: bio_zh ?? '',
    }
    const en = {
      name: name_en ?? '',
      bio: bio_en ?? '',
    }

    return { id, avatar: formattedAvatar ?? '', zh, en }
  })
}
