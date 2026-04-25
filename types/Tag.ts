export interface Tag {
  id: string | null
  zh: NameAndDesc
  en: NameAndDesc
}

interface NameAndDesc {
  name: string | null
  description: string | null
}
