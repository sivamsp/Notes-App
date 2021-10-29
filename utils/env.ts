export const isServer = typeof window === 'undefined'

export const apiServerUrl = process.browser
  ? `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}`
  : `http://${process.env.API_SERVER_ADDRESS}`
