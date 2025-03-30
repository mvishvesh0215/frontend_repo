import { config } from './config'

// path = user/login
// url = http://localhost:6969/
// http://localhost:6969/user/signin
export function createUrl(path) {
  return `${config.serverUrl}/${path}`
}
