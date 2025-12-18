import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'


afterEach(() => {
  cleanup()
})


vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/'
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn()
}))


vi.mock('next/image', () => ({
  default: vi.fn((props) => props)
}))


process.env.TRANSACTIONS_ENDPOINT = 'http://localhost:3000/api'

global.fetch = vi.fn()

process.env.TZ = 'America/Bogota'

export const resetMocks = () => {
  vi.clearAllMocks()
  vi.resetAllMocks()
}
