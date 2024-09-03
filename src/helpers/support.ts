import dotenv from 'dotenv'
import { BASE_64_CHAR } from '../constants'

dotenv.config()

const validateURL = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch (error) {
    console.error('error in validate URL', error)
    return false
  }
}

const encodeBase62 = (num: number): string => {
  let shortCode = ''
  while (num > 0 && shortCode.length < 6) {
    shortCode = BASE_64_CHAR[num % 62] + shortCode
    num = Math.floor(num / 62)
  }
  return shortCode.padStart(6, '0')
}

const generateShortCode = (id: number): string => {
  return encodeBase62(id)
}

const generateUniqueCode = (): string => {
  const id = Math.floor(Math.random() * 62 ** 6)
  return generateShortCode(id)
}

export { validateURL, generateUniqueCode }
