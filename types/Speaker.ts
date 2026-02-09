export interface Speaker {
  id: string
  avatar: string
  zh: NameAndBio
  en: NameAndBio
}

interface NameAndBio {
  name: string
  bio: string
}
