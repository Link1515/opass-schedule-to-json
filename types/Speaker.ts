export interface Speaker {
  id: string | null
  avatar: string | null
  zh: NameAndBio
  en: NameAndBio
}

interface NameAndBio {
  name: string | null
  bio: string | null
}
