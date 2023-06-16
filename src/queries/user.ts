export interface User {
  id: string
  username: string
  email: string
  website: string
  company: Company
  // phone: string
  // name: string
}

export interface Company {
  name: string
  // catchPhrase: string
  // bs: string
}