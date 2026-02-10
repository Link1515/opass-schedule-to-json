import type { Session } from '../types/Session'

const sessionDefaults = {
  id: '',
  type: '',
  room: '',
  broadcast: '',
  start: '',
  end: '',
  qa: '',
  slide: '',
  co_write: '',
  live: '',
  record: '',
  language: '',
  uri: '',
  title_zh: '',
  title_en: '',
  description_zh: '',
  description_en: '',
}

export function normalizeSessions(rawSessions: Record<string, string>[] = []): Session[] {
  if (rawSessions.length === 0) return []

  rawSessions.splice(0, 1)
  return rawSessions.map(rawSession => {
    const { id, type, room, broadcast, start, end, qa, slide, co_write, live, record, language, uri, title_zh, title_en, description_zh, description_en } = { ...sessionDefaults, ...rawSession }

    const zh = {
      title: title_zh,
      description: description_zh,
    }
    const en = {
      title: title_en,
      description: description_en,
    }

    const speakers: string[] = []
    for (let i = 1; ; i++) {
      const key = `speaker${i}id`
      if (!Object.hasOwn(rawSession, key)) break
      const cur = rawSession[key]
      if (!cur) continue
      speakers.push(cur)
    }

    const tags: string[] = []
    for (let i = 1; ; i++) {
      const key = `tag${i}`
      if (!Object.hasOwn(rawSession, key)) break
      const cur = rawSession[key]
      if (!cur) continue
      tags.push(cur)
    }

    return { id, type, room, broadcast, start, end, qa, slide, co_write, live, record, language, uri, zh, en, speakers, tags }
  })
}
