import { sheetsToJson } from '~/utils/sheetsToJson'
import { normalizeSessions } from '~/utils/normalizeSessions'
import { normalizeSpeakers } from '~/utils/normalizeSpeakers'
import { normalizeRooms } from '~/utils/normalizeRooms'
import { normalizeSessionTypes } from '~/utils/normalizeSessionTypes'
import { normalizeTags } from '~/utils/normalizeTags'

interface Config {
  spreadsheetId: string
  avatarBaseUrl?: string
  defaultAvatar?: string
}

export const opassSheetNames = ['Session', 'Speaker', 'Room', 'SessionType', 'Tag'] as const

export async function scheduleToJson({ spreadsheetId, avatarBaseUrl, defaultAvatar }: Config) {
  const rawSchedule = await sheetsToJson(spreadsheetId, opassSheetNames)

  return {
    sessions: normalizeSessions(rawSchedule['Session']),
    speakers: normalizeSpeakers(rawSchedule['Speaker'], avatarBaseUrl, defaultAvatar),
    rooms: normalizeRooms(rawSchedule['Room']),
    session_types: normalizeSessionTypes(rawSchedule['SessionType']),
    tags: normalizeTags(rawSchedule['Tag']),
  }
}
