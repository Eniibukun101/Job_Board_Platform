import type { AuthResponse, AuthUser } from './api'

const AUTH_STORAGE_KEY = 'jobnest-auth'

export interface StoredAuth {
  token: string
  user: AuthUser
}

export function saveStoredAuth(payload: AuthResponse | StoredAuth) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ token: payload.token, user: payload.user }),
  )
}

export function getStoredAuth(): StoredAuth | null {
  if (typeof window === 'undefined') return null

  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY)
  if (!rawValue) return null

  try {
    return JSON.parse(rawValue) as StoredAuth
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function getStoredToken() {
  return getStoredAuth()?.token || null
}

export function getStoredUser() {
  return getStoredAuth()?.user || null
}

export function updateStoredUser(user: AuthUser) {
  const current = getStoredAuth()
  if (!current || typeof window === 'undefined') return

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ token: current.token, user }),
  )
}

export function clearStoredAuth() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}
