export interface Session {
  id: string
  type: string
  room: string
  broadcast: any
  start: string
  end: string
  qa: string
  slide: string
  co_write: string
  live: string
  record: string
  language: string
  uri: string
  zh: TitleAndDesc
  en: TitleAndDesc
  speakers: string[]
  tags: string[]
}

interface TitleAndDesc {
  title: string
  description: string
}
