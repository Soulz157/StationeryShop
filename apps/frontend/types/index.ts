export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  address: string
  phone: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface UpdateProfilePayload {
  firstName?: string
  lastName?: string
  address?: string
  phone?: string
}
