import { uniqueId } from 'lodash-es'

export interface DataProcessingType {
  x: string
  f: (data: object) => void
}

const map = new Map<string, DataProcessingType>()

const push = (x: string) => {
  return new Promise((resolve) => {
    const f = (data: object) => {
      resolve(data)
    }
    map.set(uniqueId(), { x, f })
  })
}

const fetch = () => {
  const values = [...map.values()]
  map.clear()
  return values
}

export const pb = { push }

export const pb2 = { fetch }
