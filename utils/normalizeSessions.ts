import type { Session } from '../types/Session'

const sessionDefault = {
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
  description_en: ''
}

export function normalizeSessions(rawSessions: Record<string, string>[]): Session[] {
  if (rawSessions.length === 0) return []

  rawSessions.splice(0, 1)
  return rawSessions.map(rawSession => {
    const { id, type, room, broadcast, start, end, qa, slide, co_write, live, record, language, uri, title_zh, title_en, description_zh, description_en } = { ...sessionDefault, ...rawSession }

    const zh = {
      title: title_zh,
      description: description_zh
    }
    const en = {
      title: title_en,
      description: description_en
    }

    const speakers: string[] = []
    for (let i = 1; ; i++) {
      const cur = rawSession[`speaker${i}id`]
      if (!cur) break
      speakers.push(cur)
    }

    const tags: string[] = []
    for (let i = 1; ; i++) {
      const cur = rawSession[`tag${i}`]
      if (!cur) break
      tags.push(cur)
    }

    return { id, type, room, broadcast, start, end, qa, slide, co_write, live, record, language, uri, zh, en, speakers, tags }
  })
}
