import { sheetsToJson } from './utils/sheetsToJson'
import { normalizeSessions } from './utils/normalizeSessions'
import { normalizeSpeakers } from './utils/normalizeSpeakers'
import { normalizeRooms } from './utils/normalizeRooms'
import { normalizeSessionTypes } from './utils/normalizeSessionTypes'
import { normalizeTags } from './utils/normalizeTags'

interface Config {
  apiKey: string
  spreadsheetId: string
}

export async function scheduleToJson({ apiKey, spreadsheetId }: Config) {
  const rawSchedule = await sheetsToJson({ apiKey, spreadsheetId })

  return {
    sessions: normalizeSessions(rawSchedule['Session'] ?? []),
    speakers: normalizeSpeakers(rawSchedule['Speaker'] ?? []),
    rooms: normalizeRooms(rawSchedule['Room'] ?? []),
    session_types: normalizeSessionTypes(rawSchedule['SessionType'] ?? []),
    tags: normalizeTags(rawSchedule['Tag'] ?? [])
  }
}
