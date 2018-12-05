import { Flash } from 'coreModules/notifications/components'
import { COLLISION_REPLACE, FIXED } from 'coreModules/notifications/constants'

const ERROR = {
  collision: COLLISION_REPLACE,
  component: Flash,
  displayType: FIXED,
  level: 'error',
  priority: 20,
  type: 'ERROR',
}

const SUCCESS = {
  collision: COLLISION_REPLACE,
  component: Flash,
  displayType: FIXED,
  level: 'success',
  priority: 20,
  ttl: 2000,
  type: 'SUCCESS',
}

export { ERROR, SUCCESS }
