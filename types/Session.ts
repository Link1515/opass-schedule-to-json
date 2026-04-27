export interface Session {
  id: string | null
  type: string | null
  room: string | null
  broadcast: string[] | null
  start: string | null
  end: string | null
  qa: string | null
  slide: string | null
  co_write: string | null
  live: string | null
  record: string | null
  language: string | null
  uri: string | null
  zh: TitleAndDesc
  en: TitleAndDesc
  speakers: string[]
  tags: string[]
}

interface TitleAndDesc {
  title: string | null
  description: string | null
}
